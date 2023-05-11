import clsx from 'clsx'
import styles from './Reviews.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Swiper as SwiperType} from 'swiper'
import {useState} from 'react'
import SliderButton from '../../common/slider/SliderButton'
import LinkComponent from '../../common/link-component/LinkComponent'

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
        slidesPerView={1.5}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={onSlideChange}
        spaceBetween={72}
      >
        {items.map((item, index) => (
          <SwiperSlide className={styles.slide} key={index}>
            <h2>{item.title}</h2>

            <div className={styles.content}>
              <img className={styles.signature} src={item.signature} alt='signature' />

              <hr />

              <div className={styles.meta}>
                <LinkComponent link={item.link} linkExternal>
                  <span className={styles.format}>{item.format}</span>
                </LinkComponent>

                <div className={styles.name}>
                  <h4>{item.name}</h4>
                  <p>{item.role}</p>
                </div>

                <img src={item.image} className={styles.company} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderButton
        onClick={() => swiper?.slidePrev()}
        className={clsx(styles.arrow, {[styles.disabled]: isBeginning})}
      />
      <SliderButton
        onClick={() => swiper?.slideNext()}
        next
        className={clsx(styles.arrow, styles.arrowNext, {[styles.disabled]: isEnd})}
      />
      <p className={styles.index}>
        {index} <span>/</span> {swiper?.slides?.length}
      </p>
    </div>
  )
}

const Reviews = ({items}: {items: Review[]}) => {
  return (
    <section className={styles.reviews}>
      <h1 className={styles.title}>Отзывы</h1>

      <p className={styles.description}>
        Деятельность ПРОМВИЗИО отмечена множеством благодарственных писем от руководителей компаний нефтегазовой сферы,
        а контент, произведённый нашей компанией, демонстрировался на тематических мероприятиях высшего уровня: ПМЭФ,
        ВЭФ, Арктический форум, Транспортная неделя, заседания Русского географического общества.
      </p>

      <Slider items={items} />

      <p className={styles.nda}>
        Мы гарантируем конфиденциальность информации и соблюдение корпоративной тайны, поэтому в договор включается
        соглашение о неразглашении (NDA). Использование полученного фото- и видеоматериала возможно только с письменного
        разрешения заказчика.
      </p>
    </section>
  )
}

export default Reviews
