import styles from './ArticlePage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import useMedia from '../../utils/useMedia'
import {Line} from '../news/NewsPage'
import NewsInnerLink from '../../common/news-inner-link/NewsInnerLink'
import {useParams} from 'react-router-dom'
import LinkComponent from '../../common/link-component/LinkComponent'
import {GalleryItem} from '../gallery/GalleryItem'
import {Autoplay, Swiper as SwiperType} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import NewsItem, {NewsItemProps} from '../news/NewsItem'
import SliderButton from '../../common/slider/SliderButton'
import {Fragment, SetStateAction, useContext, useState} from 'react'
import arrowSVG from '../../../icons/arrow-circleless.svg'
import PreviewContext from '../../utils/preview'
import {useQueryFindData} from '../../utils/useQueryData'
import {ArticleData} from './types'
import {Article} from '../news/types'
import Loading from '../../common/loading/Loading'

const parseNewsData = (item: Article): NewsItemProps => ({
  title: item.title,
  description: item.preview_text,
  image: item.banner,
  date: item.datetime,
  link: item.url,
  innerLink: item.source
})

const RecommendedSlider = ({isMobile, items}: {isMobile: boolean; items: Article[] | undefined}) => {
  const [swiper, setSwiper] = useState<SwiperType>()
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const onSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }
  return (
    <>
      <Swiper
        className={styles.swiper}
        modules={[Autoplay]}
        slidesPerView={isMobile ? 'auto' : 2}
        speed={600}
        onSwiper={(swiper: SetStateAction<SwiperType | undefined>) => setSwiper(swiper)}
        spaceBetween={32}
        direction={isMobile ? 'vertical' : 'horizontal'}
        onSlideChange={onSlideChange}
        autoplay={{delay: 2500, disableOnInteraction: false}}
      >
        {items?.map((newsItem, index) => (
          <SwiperSlide key={index}>
            <NewsItem {...parseNewsData(newsItem)} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigation}>
        <SliderButton onClick={() => swiper?.slidePrev()} disabled={isBeginning} className={styles.arrow} />
        <SliderButton onClick={() => swiper?.slideNext()} next disabled={isEnd} className={styles.arrow} />
      </div>
    </>
  )
}

const ArticlePage = () => {
  const {id} = useParams()
  const {isMobile, isDesktop} = useMedia()
  const {preview} = useContext(PreviewContext)
  const {data, isLoading} = useQueryFindData<ArticleData>([`news-${id}`])

  const parsedData = preview ? preview : data

  return (
    <Page className={styles.page} scrollButton={isDesktop}>
      <Helmet>
        <title>{parsedData?.title || 'Новость'} </title>
      </Helmet>

      {isDesktop && <Line />}

      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.article}>
            {isMobile && (
              <>
                <LinkComponent link='/news' className={styles.back}>
                  <img src={arrowSVG} alt='arrow' /> <span>Обратно в вестник</span>
                </LinkComponent>

                <Swiper className={styles.swiper} slidesPerView={1} spaceBetween={8}>
                  {parsedData?.right_side?.map((media, index) => (
                    <SwiperSlide key={index}>
                      <GalleryItem thumbnail={media.value?.url} className={styles.mediaItem} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}

            <div className={styles.left}>
              {isDesktop && (
                <div className={styles.breadCrumbs}>
                  <LinkComponent link='/' className={styles.mainPageLink}>
                    Вестник
                  </LinkComponent>
                  <span className={styles.currentPageLink}> • {parsedData?.title}</span>
                </div>
              )}

              <h2>{parsedData?.title}</h2>
              <time>{new Date(parsedData?.datetime as Date).toLocaleDateString()}</time>
              <Line className={styles.line} />
              <div dangerouslySetInnerHTML={{__html: parsedData?.body as TrustedHTML}}></div>

              {parsedData?.source ? (
                <NewsInnerLink className={styles.link} link={parsedData?.source.link} text={parsedData.source.label} />
              ) : null}
            </div>

            {isDesktop && (
              <div className={styles.right}>
                {parsedData?.right_side?.map((media, index) => (
                  <GalleryItem key={index} thumbnail={media.value?.url} className={styles.mediaItem} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.recommended}>
            <Line className={styles.line} />

            {isDesktop && <RecommendedSlider items={parsedData?.similar} isMobile={isMobile} />}

            {isMobile && (
              <>
                <h1>Похожие новости</h1>

                <div className={styles.newsMobile}>
                  {parsedData?.similar?.map((newsItem, index) => (
                    <Fragment key={index}>
                      <NewsItem key={index} {...parseNewsData(newsItem)} />

                      {index !== (parsedData?.similar?.length || 0) - 1 ? <Line className={styles.line} /> : null}
                    </Fragment>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Page>
  )
}

export default ArticlePage
