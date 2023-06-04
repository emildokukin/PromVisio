import {useState} from 'react'
import styles from './GalleryPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx'
import {GALLERY_ITEM_TYPE, GalleryItem} from './GalleryItem'

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
        {section === SECTION.PHOTO && PHOTOS.map((photo) => <GalleryItem thumbnail={photo.src} key={photo.src} />)}
        {section === SECTION.VIDEO &&
          VIDEOS.map((video) => <GalleryItem thumbnail={video.src} type={GALLERY_ITEM_TYPE.VIDEO} key={video.src} />)}
      </div>
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
