import {ArticleData} from '../article/types'
import {GalleryData} from '../gallery/types'
import {HomeData} from '../home/types'
import {NewsData} from '../news/types'
import {PotentialData} from '../potential/types'

export interface Preview extends GalleryData, PotentialData, HomeData, NewsData, ArticleData {
  id?: number
  title?: string
  meta?: Meta
}

export interface Meta {
  html_url: string
}
