import {useState} from 'react'
import styles from './GalleryPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx'
import {ReactComponent as PlusSVG} from '../../../icons/plus.svg'
import {ReactComponent as VideoPlaySVG} from '../../../icons/video-play.svg'

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

const Gallery = () => {
  const [section, setSection] = useState(SECTION.PHOTO)

  return (
    <Page floatingHireButton>
      <Helmet>
        <title>Галерея</title>
      </Helmet>

      <section className={styles.content}>
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

        <ul
          className={clsx(styles.gallery, {
            [styles.photo]: section === SECTION.PHOTO,
            [styles.video]: section === SECTION.VIDEO
          })}
        >
          {section === SECTION.PHOTO &&
            PHOTOS.map((photo) => (
              <li className={styles.item} key={photo.src}>
                <img src={photo.src} alt='gallery photo' />
                <div className={styles.decor}>
                  <PlusSVG />
                </div>
              </li>
            ))}

          {section === SECTION.VIDEO &&
            VIDEOS.map((video) => (
              <li className={styles.item} key={video.src}>
                <img src={video.src} alt='gallery video thumbnail' />
                <div className={styles.decor}>
                  <VideoPlaySVG />
                </div>
              </li>
            ))}
        </ul>
      </section>
    </Page>
  )
}

export default Gallery
