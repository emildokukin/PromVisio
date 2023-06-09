import {Image} from '../../utils/types'

export interface Potential {
  id?: number
  title?: string
  slider?: Image[]
  gallery?: Gallery
}

export interface Gallery {
  images?: Images
  videos?: Videos
}

export interface Images {
  count?: number
  total_pages?: number
  next?: string | null
  previous?: string | null
  results?: Image[]
}

export interface Videos {
  count?: number
  total_pages?: number
  next?: string | null
  previous?: string | null
  results?: Result[]
}

export interface Result {
  thumbnail?: Image
  iframe?: string
}
