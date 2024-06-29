export enum NotionPageStatus {
  Private = 'Private',
  Public = 'Public',
}

export enum NotionPageType {
  Blog = 'Blog',
  Note = 'Note',
}

export interface NotionPage {
  id: string
  createdAt: string
  lastEditedAt: string
  title: string
  slug: string
  status: NotionPageStatus
  type: NotionPageType
  category: string
  tags: string[]
  description: string
  cover: string | null
}
