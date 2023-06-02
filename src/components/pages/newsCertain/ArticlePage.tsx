import styles from './ArticlePage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import useMedia from '../../utils/useMedia'
import {Line, News, news} from '../news/NewsPage'
import GazpromLink from '../../common/gazprom-link/GazpromLink'
import {useParams} from 'react-router-dom'
import LinkComponent from '../../common/link-component/LinkComponent'
import {GalleryItem} from '../gallery/GalleryItem'
import {Autoplay, Swiper as SwiperType} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import NewsItem, {NewsItemProps} from '../news/NewsItem'
import SliderButton from '../../common/slider/SliderButton'
import {SetStateAction, useState} from 'react'
import arrowSVG from '../../../icons/arrow-circleless.svg'

const parseNewsData = (item: News): NewsItemProps => ({
  title: item.title,
  description: item.description,
  imgLink: item.mediaLinks[0],
  linkToGazprom: item.linkToGazprom,
  date: item.date,
  linkToNewsItem: '/news/' + item.id
})

const ArticlePage = () => {
  const {isMobile, isDesktop} = useMedia()
  const [swiper, setSwiper] = useState<SwiperType>()

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const {id} = useParams()

  const onSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const currentNews = news.filter((news) => news.id === parseInt(id || '0'))[0]

  return (
    <Page className={styles.page} floatingHireButton>
      <Helmet>
        <title>Конкретная новость</title>
      </Helmet>

      {isDesktop && <Line />}

      <div className={styles.wrapper}>
        <div className={styles.article}>
          {isMobile && (
            <>
              <div className={styles.back}>
                <img src={arrowSVG} alt='arrow' /> <span>Обратно в вестник</span>
              </div>

              <Swiper className={styles.swiper} slidesPerView={1} spaceBetween={8}>
                {currentNews.mediaLinks.map((media, index) => (
                  <SwiperSlide key={index}>
                    <GalleryItem thumbnail={media} className={styles.mediaItem} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}

          <div className={styles.left}>
            <div className={styles.breadCrumbs}>
              <LinkComponent link='/' className={styles.mainPageLink}>
                Вестник
              </LinkComponent>
              <span className={styles.currentPageLink}> • {currentNews.title}</span>
            </div>

            <h2>{currentNews.title}</h2>
            <time>{currentNews.date}</time>
            <Line className={styles.line} />
            <p>{currentNews.description}</p>
            {currentNews.linkToGazprom ? (
              <GazpromLink className={styles.link} linkToGazprom={currentNews.linkToGazprom} />
            ) : null}
          </div>

          {isDesktop && (
            <div className={styles.right}>
              {currentNews.mediaLinks.map((media, index) => (
                <GalleryItem key={index} thumbnail={media} className={styles.mediaItem} />
              ))}
            </div>
          )}
        </div>

        <div className={styles.recommended}>
          <Line className={styles.line} />

          {isDesktop && (
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
                {news.map((newsItem, index) => (
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
          )}

          {isMobile && news.map((newsItem, index) => <NewsItem key={index} {...parseNewsData(newsItem)} />)}
        </div>
      </div>
    </Page>
  )
}

export default ArticlePage
