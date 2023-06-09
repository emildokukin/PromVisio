import {Image} from '../../utils/types'

export const blockTypes = ['team'] as const

type BlockType = (typeof blockTypes)[number]

export interface Data {
  team?: Team
}

export interface Home {
  title?: string
  content?: Content[]
}

interface Content {
  type?: BlockType
  value?: Team
}

export interface Team {
  title?: string
  text1?: string
  text2?: string
  images?: Image[]
}
