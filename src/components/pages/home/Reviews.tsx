import clsx from 'clsx'
import styles from './Reviews.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Swiper as SwiperType} from 'swiper'
import {useState} from 'react'
import SliderButton from '../../common/slider/SliderButton'
import LinkComponent from '../../common/link-component/LinkComponent'
import useMedia from '../../utils/useMedia'

export interface Review {
  title: string
  signature: string
  format: string
  link: string
  name: string
  role: string
  image: string
}

const Slider = ({items}: {items: Review[]}) => {
  const [swiper, setSwiper] = useState<SwiperType>()
  const [isEnd, setIsEnd] = useState(false)
  const [isBeginning, setIsBeginning] = useState(true)
  const [index, setIndex] = useState(1)
  const {isMobile, isDesktop} = useMedia()

  const onSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
    setIndex(swiper.activeIndex + 1)
  }

  return (
    <div className={styles.swiperWrapper}>
      <Swiper
        modules={[Navigation]}
        className={styles.swiper}
        slidesPerView={isMobile ? 1.1 : 1.5}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={onSlideChange}
        spaceBetween={isMobile ? 16 : 72}
        grabCursor
        speed={500}
      >
        {items.map((item, index) => (
          <SwiperSlide className={styles.slide} key={index}>
            <h2>{item.title}</h2>

            <div className={styles.content}>
              {isDesktop && (
                <img
                  className={clsx(styles.signature, {[styles.signatureShifted]: index === 1})}
                  src={item.signature}
                  alt='signature'
                />
              )}

              <hr />

              <div className={styles.meta}>
                <LinkComponent link={item.link} linkExternal>
                  <span className={styles.format}>{item.format}</span>
                </LinkComponent>

                <div className={styles.name}>
                  <h4>{item.name}</h4>
                  <p>{item.role}</p>
                </div>

                {isDesktop && <img src={item.image} className={styles.company} />}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isDesktop && (
        <>
          <SliderButton onClick={() => swiper?.slidePrev()} disabled={isBeginning} className={styles.arrowPrev} />
          <SliderButton onClick={() => swiper?.slideNext()} next disabled={isEnd} className={styles.arrowNext} />
          <p className={styles.index}>
            {index} <span>/</span> {swiper?.slides?.length}
          </p>
        </>
      )}
    </div>
  )
}

const Reviews = ({items}: {items: Review[]}) => {
  const {isDesktop} = useMedia()

  return (
    <section className={styles.reviews}>
      <h1 className={styles.title}>Отзывы</h1>

      <p className={styles.description}>
        Деятельность ПРОМВИЗИО отмечена множеством благодарственных писем от руководителей компаний нефтегазовой сферы,
        ведущих деятельность на континентальном шельфе Российской федерации, а также организаций, выполняющих
        вспомогательные функции при таких работах.
      </p>

      <Slider items={items} />

      {isDesktop && (
        <p className={styles.nda}>
          Мы гарантируем конфиденциальность информации и соблюдение корпоративной тайны, поэтому в договор включается
          соглашение о неразглашении (NDA). Использование полученного фото- и видеоматериала возможно только с
          письменного разрешения заказчика.
        </p>
      )}
    </section>
  )
}

export default Reviews
