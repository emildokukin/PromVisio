import {Image} from '../../utils/types'
import {Gallery} from '../gallery/types'

export interface PotentialData {
  id?: number
  title?: string
  slider?: Image[]
  gallery?: Gallery
}
