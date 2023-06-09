import {useCallback, useContext, useState} from 'react'
import styles from './GalleryPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx'
import {GALLERY_ITEM_TYPE, GalleryItem} from './GalleryItem'
import {GalleryModalContext} from '../../common/modal/GalleryModalContext'
import Pagination from '../news/Pagination'

enum SECTION {
  PHOTO,
  VIDEO
}

const PHOTOS = [
  {src: '/media/gallery/photo1.png'},
  {src: '/media/gallery/photo2.png'},
  {src: '/media/gallery/photo3.png'},
  {src: '/media/gallery/photo4.png'},
  {src: '/media/gallery/photo5.png'},
  {src: '/media/gallery/photo6.png'}
]

const VIDEOS = [
  {src: '/media/gallery/photo2.png'},
  {src: '/media/gallery/photo1.png'},
  {src: '/media/gallery/photo4.png'},
  {src: '/media/gallery/photo5.png'},
  {src: '/media/gallery/photo3.png'},
  {src: '/media/gallery/photo6.png'}
]

interface GalleryProps {
  className?: string
}

export const Gallery = ({className}: GalleryProps) => {
  const [section, setSection] = useState(SECTION.PHOTO)
  const {toggle, updateItems, updateIndex} = useContext(GalleryModalContext)

  const toggleModalVisibility = useCallback((items: string[], index: number) => {
    updateItems(items)
    updateIndex(index)
    toggle()
  }, [])

  return (
    <section className={clsx(styles.content, className)}>
      <ul className={styles.sections}>
        <li
          className={clsx(styles.section, {[styles.sectionCurrent]: section === SECTION.PHOTO})}
          onClick={() => setSection(SECTION.PHOTO)}
        >
          Фото
        </li>
        <li
          className={clsx(styles.section, {[styles.sectionCurrent]: section === SECTION.VIDEO})}
          onClick={() => setSection(SECTION.VIDEO)}
        >
          Видео
        </li>
      </ul>

      <div
        className={clsx(styles.gallery, {
          [styles.video]: section === SECTION.VIDEO
        })}
      >
        {section === SECTION.PHOTO &&
          PHOTOS.map((photo, index) => (
            <GalleryItem
              thumbnail={photo.src}
              key={photo.src}
              onClick={() =>
                toggleModalVisibility(
                  PHOTOS.map((photo) => photo.src),
                  index
                )
              }
            />
          ))}
        {section === SECTION.VIDEO &&
          VIDEOS.map((video, index) => (
            <GalleryItem
              thumbnail={video.src}
              type={GALLERY_ITEM_TYPE.VIDEO}
              key={video.src}
              onClick={() =>
                toggleModalVisibility(
                  VIDEOS.map((photo) => photo.src),
                  index
                )
              }
            />
          ))}
      </div>

      <Pagination className={styles.pagination} />
    </section>
  )
}

const GalleryPage = () => {
  return (
    <Page>
      <Helmet>
        <title>Галерея</title>
      </Helmet>

      <Gallery />
    </Page>
  )
}

export default GalleryPage
