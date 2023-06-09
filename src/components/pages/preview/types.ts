import {Image} from '../../utils/types'
import {Gallery} from '../gallery/types'

export interface Preview {
  id?: number
  meta?: Meta
  title?: string
  content?: Content[]
  slider?: Image[]
  gallery?: Gallery
}

export interface Content {
  type?: string
  value?: Value
  id?: string
}

export interface Value {
  title?: string
  text?: string
  image?: Image
}

export interface Meta {
  html_url: string
}
