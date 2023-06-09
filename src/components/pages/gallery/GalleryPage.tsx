import {useCallback, useContext, useState} from 'react'
import styles from './GalleryPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx'
import {GALLERY_ITEM_TYPE, GalleryItem} from './GalleryItem'
import {GalleryModalContext} from '../../common/modal/GalleryModalContext'
import Pagination from '../news/Pagination'
import {GalleryData, Images, Videos} from './types'
import API from '../../utils/API'
import {ENDPOINT} from '../../utils/endpoints'
import PreviewContext from '../../utils/preview'
import {useQueryFindData} from '../../utils/useQueryData'
import Loading from '../../common/loading/Loading'

enum SECTION {
  PHOTO,
  VIDEO
}

interface GalleryProps {
  className?: string
  images?: Images
  videos?: Videos
  pageID?: number
}

export const Gallery = ({className, images: initialImages, videos: initialVideos, pageID}: GalleryProps) => {
  const [section, setSection] = useState(SECTION.PHOTO)
  const [images, setImages] = useState(initialImages)
  const [videos, setVideos] = useState(initialVideos)
  const {toggle, updateItems, updateIndex} = useContext(GalleryModalContext)

  const toggleModalVisibility = useCallback((items: string[] | undefined, index: number) => {
    updateItems(items || [])
    updateIndex(index)
    toggle()
  }, [])

  const fetchData = useCallback(
    async (page: number) => {
      if (section === SECTION.PHOTO) {
        const data = await API.GET(`${ENDPOINT.gallery}/${pageID}/images/`, {params: {page: page}}).then(
          (res) => res.data as Images
        )

        setImages(data)
      } else if (section === SECTION.VIDEO) {
        const data = await API.GET(`${ENDPOINT.gallery}/${pageID}/videos/`, {params: {page: page}}).then(
          (res) => res.data as Videos
        )

        setVideos(data)
      }
    },
    [initialImages, initialVideos]
  )

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

      <Pagination
        className={styles.pagination}
        onDotClick={fetchData}
        totalPages={section === SECTION.PHOTO ? images?.total_pages : videos?.total_pages}
      />
    </section>
  )
}

const GalleryPage = () => {
  const {preview} = useContext(PreviewContext)
  const {data, isLoading} = useQueryFindData<GalleryData>(['gallery'])

  const parsedData = preview ? preview : data

  return (
    <Page>
      <Helmet>
        <title>{parsedData?.title || 'Галерея'}</title>
      </Helmet>

      {isLoading ? (
        <Loading />
      ) : (
        <Gallery images={parsedData?.gallery?.images} videos={parsedData?.gallery?.videos} pageID={parsedData?.id} />
      )}
    </Page>
  )
}

export default GalleryPage
