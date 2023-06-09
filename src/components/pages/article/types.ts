import {Image} from '../../utils/types'
import {Article, Source} from '../news/types'

export interface ArticleData {
  title?: string
  datetime: Date
  source?: Source | null
  body?: string
  right_side?: Media[]
  similar?: Article[]
}

export interface Media {
  type?: string
  value?: Image
  id?: string
}
