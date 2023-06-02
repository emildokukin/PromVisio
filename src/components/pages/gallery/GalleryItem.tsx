import clsx from 'clsx'
import {ReactComponent as VideoPlaySVG} from '../../../icons/video-play.svg'
import {ReactComponent as PlusSVG} from '../../../icons/plus.svg'
import styles from './GalleryItem.module.scss'

export enum GALLERY_ITEM_TYPE {
  PHOTO,
  VIDEO
}

interface GalleryItemProps {
  thumbnail: string | undefined
  type?: GALLERY_ITEM_TYPE
  className?: string
  onClick?: () => void
}

export const GalleryItem = ({thumbnail, type = GALLERY_ITEM_TYPE.PHOTO, onClick, className}: GalleryItemProps) => (
  <div
    className={clsx(
      styles.item,
      {
        [styles.photo]: type === GALLERY_ITEM_TYPE.PHOTO,
        [styles.video]: type === GALLERY_ITEM_TYPE.VIDEO
      },
      className
    )}
    onClick={onClick}
  >
    <img src={thumbnail} alt='gallery item thumbnail' />
    <div className={styles.decor}>
      {type === GALLERY_ITEM_TYPE.PHOTO && <PlusSVG />}
      {type === GALLERY_ITEM_TYPE.VIDEO && <VideoPlaySVG />}
    </div>
  </div>
)
