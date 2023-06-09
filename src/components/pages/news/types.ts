import {Image} from '../../utils/types'

export interface NewsData {
  id?: number
  title?: string
  heading?: string
  articles?: Articles
}

export interface Articles {
  count?: number
  total_pages?: number
  next?: string
  previous?: null
  results?: Article[]
}

export interface Article {
  title: string
  url: string
  datetime: Date
  preview_text: string
  source: Source | null
  banner: Image
}

export interface Source {
  label?: string
  link?: string
  in_new_tab?: boolean
}
