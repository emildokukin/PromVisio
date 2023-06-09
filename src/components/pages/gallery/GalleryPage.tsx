import {useCallback, useContext, useState} from 'react'
import styles from './GalleryPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx'
import {GALLERY_ITEM_TYPE, GalleryItem} from './GalleryItem'
import {GalleryModalContext} from '../../common/modal/GalleryModalContext'
import Pagination from '../news/Pagination'
import {Images, Videos} from './types'

enum SECTION {
  PHOTO,
  VIDEO
}

interface GalleryProps {
  className?: string
  images?: Images
  videos?: Videos
}

export const Gallery = ({className, images, videos}: GalleryProps) => {
  const [section, setSection] = useState(SECTION.PHOTO)
  const {toggle, updateItems, updateIndex} = useContext(GalleryModalContext)

  const toggleModalVisibility = useCallback((items: string[] | undefined, index: number) => {
    updateItems(items || [])
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
          images?.results?.map((photo, index) => (
            <GalleryItem
              thumbnail={photo.url}
              alt={photo.alt}
              key={photo.url}
              onClick={() =>
                toggleModalVisibility(
                  images?.results?.map((photo) => photo.url),
                  index
                )
              }
            />
          ))}
        {section === SECTION.VIDEO &&
          videos?.results?.map((video, index) => (
            <GalleryItem
              thumbnail={video.thumbnail.url}
              alt={video.thumbnail.alt}
              type={GALLERY_ITEM_TYPE.VIDEO}
              key={video.thumbnail.url}
              onClick={() =>
                toggleModalVisibility(
                  videos?.results?.map((video) => video.iframe),
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
