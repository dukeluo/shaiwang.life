import { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { Quote } from './Quote'

//TODO: improve types here, cleanup the code
type Props = {
  block: any
}

export const NotionBlockRenderer = ({ block }: Props) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <NotionText textItems={value.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1>
          <NotionText textItems={value.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2>
          <NotionText textItems={value.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <NotionText textItems={value.rich_text} />
        </h3>
      )
    case 'bulleted_list':
      return (
        <ul className="list-outside list-disc">
          {value.children.map((b: any) => (
            <NotionBlockRenderer key={b.id} block={b} />
          ))}
        </ul>
      )
    case 'numbered_list':
      return (
        <ol className="list-outside list-decimal">
          {value.children.map((b: any) => (
            <NotionBlockRenderer key={b.id} block={b} />
          ))}
        </ol>
      )
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li className="pl-0">
          <NotionText textItems={value.rich_text} />
          {!!value.children && value.children.map((b: any) => <NotionBlockRenderer key={b.id} block={b} />)}
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} /> <NotionText textItems={value.rich_text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <NotionText textItems={value.rich_text} />
          </summary>
          {value.children?.map((b: any) => <NotionBlockRenderer key={b.id} block={b} />)}
        </details>
      )
    case 'child_page':
      return <p>{value.title}</p>
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure>
          <Image
            className="object-cover"
            placeholder="blur"
            src={src}
            alt={caption}
            blurDataURL={value.placeholder}
            width={value.size.width}
            height={value.size.height}
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return <Quote key={id} quote={value.rich_text[0].plain_text} />
    case 'code':
      return (
        <pre>
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <code key={id} className={`language-${value.language}`}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      )
    case 'file':
      const src_file = value.type === 'external' ? value.external.url : value.file.url
      const splitSourceArray = src_file.split('/')
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
      const caption_file = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure>
          <div>
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      )
    case 'bookmark':
      const href = value.url
      return (
        <a href={href} target="_brank">
          {href}
        </a>
      )
    default:
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">
            Unsupported block: ${type === 'unsupported' ? 'unsupported by Notion API' : type}
          </span>
        </div>
      )
  }
}

const NotionText = ({ textItems }: { textItems: TextRichTextItemResponse[] }) => {
  if (!textItems) {
    return null
  }

  return (
    <>
      {textItems.map((textItem) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = textItem
        return (
          <span
            key={text.content}
            className={clsx({
              'font-bold': bold,
              italic: italic,
              'line-through': strikethrough,
              underline: underline,
            })}
            style={color !== 'default' ? { color } : {}}
          >
            {(() => {
              if (code) {
                return <code>{text.content}</code>
              }
              if (text.link) {
                return <a href={text.link.url}>{text.content}</a>
              }
              return text.content
            })()}
          </span>
        )
      })}
    </>
  )
}
