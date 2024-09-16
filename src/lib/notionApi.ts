import { Client, isFullPage } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { compareAsc, compareDesc } from 'date-fns'
import { getPlaiceholder } from 'plaiceholder'

import { NotionPage, NotionPageStatus, NotionPageType } from './types'

const noop = async (block: BlockObjectResponse) => block

/**
 * Union type of all block types
 * @see https://developers.notion.com/reference/block
 */
type BlockType = BlockObjectResponse['type']

/**
 * Lookup table for transforming block types
 * Allows to transform an api response for a specific block type into a more usable format
 */
const BlockTypeTransformLookup: Record<BlockType, (block: BlockObjectResponse) => Promise<BlockObjectResponse>> = {
  file: noop,
  paragraph: noop,
  heading_1: noop,
  heading_2: noop,
  heading_3: noop,
  bulleted_list_item: noop,
  numbered_list_item: noop,
  quote: noop,
  to_do: noop,
  toggle: noop,
  template: noop,
  synced_block: noop,
  child_page: noop,
  child_database: noop,
  equation: noop,
  code: noop,
  callout: noop,
  divider: noop,
  breadcrumb: noop,
  table_of_contents: noop,
  column_list: noop,
  column: noop,
  link_to_page: noop,
  table: noop,
  table_row: noop,
  embed: noop,
  bookmark: noop,
  image: async (block: any) => {
    const contents = block[block.type]
    const buffer = await fetch(contents[contents.type].url).then(async (res) => Buffer.from(await res.arrayBuffer()))
    const {
      base64,
      metadata: { height, width },
    } = await getPlaiceholder(buffer, { size: 64 })
    block.image['size'] = { height, width }
    block.image['placeholder'] = base64

    return block
  },
  video: noop,
  pdf: noop,
  audio: noop,
  link_preview: noop,
  unsupported: noop,
}

class NotionApi {
  private readonly notion: Client
  private readonly databaseId: string
  private cache: NotionPage[] | null = null

  constructor() {
    this.notion = new Client({ auth: process.env.NOTION_TOKEN })
    this.databaseId = process.env.NOTION_DATABASE_ID!
  }

  async getBlog(sortOrder: 'asc' | 'desc' = 'desc', limit?: number) {
    return this.getPage(NotionPageType.Blog, sortOrder, limit)
  }

  async getBlogByTag(tag: string, sortOrder: 'asc' | 'desc' = 'desc', limit?: number) {
    const notes = await notionApi.getBlog(sortOrder, limit)

    return notes.filter((post) => post.tags.includes(tag))
  }

  async getBlogContent(id: string) {
    return this.getPageContent(id)
  }

  async getAllTags() {
    const posts = await notionApi.getBlog()

    return Array.from(new Set(posts.map((note) => note.tags).flat()))
  }

  async getNotes(sortOrder: 'asc' | 'desc' = 'desc', limit?: number) {
    return this.getPage(NotionPageType.Note, sortOrder, limit)
  }

  private async getPage(type: NotionPageType, sortOrder: 'asc' | 'desc' = 'desc', limit?: number) {
    const pages = await this.getDatabaseContent(this.databaseId)
    const CompareFunctionLookup = {
      asc: compareAsc,
      desc: compareDesc,
    }

    return pages
      .filter((p) => p.type === type)
      .sort((a, b) => CompareFunctionLookup[sortOrder](new Date(a.createdAt), new Date(b.createdAt)))
      .slice(0, limit)
  }

  private getDatabaseContent = async (databaseId: string): Promise<NotionPage[]> => {
    if (this.cache) {
      return this.cache
    }

    const db = await this.notion.databases.query({ database_id: databaseId })

    while (db.has_more && db.next_cursor) {
      const { results, has_more, next_cursor } = await this.notion.databases.query({
        database_id: databaseId,
        start_cursor: db.next_cursor,
      })
      db.results = [...db.results, ...results]
      db.has_more = has_more
      db.next_cursor = next_cursor
    }

    this.cache = db.results
      .filter((page) => isFullPage(page))
      .map((page) => ({
        id: page.id,
        createdAt: page.created_time,
        lastEditedAt: page.last_edited_time,
        title: 'title' in page.properties.title ? page.properties.title.title.map((p) => p.plain_text).join('') : '',
        slug:
          'rich_text' in page.properties.slug ? page.properties.slug.rich_text.map((p) => p.plain_text).join('') : '',
        status: ('select' in page.properties.status ? page.properties.status.select?.name : '') as NotionPageStatus,
        type: ('select' in page.properties.type ? page.properties.type.select?.name : '') as NotionPageType,
        category: 'select' in page.properties.category ? page.properties.category.select?.name! : '',
        tags: 'multi_select' in page.properties.tags ? page.properties.tags.multi_select.map(({ name }) => name) : [],
        description:
          'rich_text' in page.properties.description
            ? page.properties.description.rich_text.map((p) => p.plain_text).join('')
            : '',
        cover: page.cover?.type === 'external' ? page.cover.external.url : null,
      }))
      .filter((page) => page.status === NotionPageStatus.Public)

    return this.cache
  }

  private getPageContent = async (pageId: string) => {
    const blocks = await this.getBlocks(pageId)

    const blocksChildren = await Promise.all(
      blocks.map(async (block) => {
        const contents = block[block.type as keyof typeof block] as any
        if (!['unsupported', 'child_page'].includes(block.type) && block.has_children) {
          contents.children = await this.getBlocks(block.id)
        }

        return block
      })
    )

    return Promise.all(
      blocksChildren.map(async (block) => {
        return BlockTypeTransformLookup[block.type as BlockType](block)
      })
    ).then((bs) => {
      return bs.reduce((acc: any, curr) => {
        if (curr.type === 'bulleted_list_item') {
          if (acc[acc.length - 1]?.type === 'bulleted_list') {
            acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr)
          } else {
            acc.push({
              type: 'bulleted_list',
              bulleted_list: { children: [curr] },
            })
          }
        } else if (curr.type === 'numbered_list_item') {
          if (acc[acc.length - 1]?.type === 'numbered_list') {
            acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr)
          } else {
            acc.push({
              type: 'numbered_list',
              numbered_list: { children: [curr] },
            })
          }
        } else {
          acc.push(curr)
        }
        return acc
      }, [])
    })
  }

  private getBlocks = async (blockId: string) => {
    const list = await this.notion.blocks.children.list({
      block_id: blockId,
    })

    while (list.has_more && list.next_cursor) {
      const { results, has_more, next_cursor } = await this.notion.blocks.children.list({
        block_id: blockId,
        start_cursor: list.next_cursor,
      })
      list.results = list.results.concat(results)
      list.has_more = has_more
      list.next_cursor = next_cursor
    }

    return list.results as BlockObjectResponse[]
  }
}

export const notionApi = new NotionApi()
