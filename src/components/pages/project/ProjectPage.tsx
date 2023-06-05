import styles from './ProjectPage.module.scss'
import compassSVG from '../../../icons/compass.svg'
import {ReactComponent as GlobeSVG} from '../../../icons/globe.svg'
import {ReactComponent as GlobeArcticSVG} from '../../../icons/globe-arctic.svg'
import shipIMG1 from '/media/project/ship.jpg'
import shipIMG2 from '/media/project/ship-2.jpg'
import shipIMG3 from '/media/project/ship-3.jpg'
import shipBuildingIMG from '/media/project/ship-building.jpg'
import arcticIMG from '/media/project/arctic.jpg'
import viewFromShipIMG from '/media/project/view-from-ship.jpg'
import bearIMG from '/media/project/bear.jpg'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Swiper as SwiperType} from 'swiper'
import useMedia from '../../utils/useMedia'
import {SetStateAction, useState} from 'react'
import SliderButton from '../../common/slider/SliderButton'

interface Slide {
  title: string
  description: string
  image: string
}

const slides: Slide[] = [
  {
    title: 'В объективах наших камер',
    description: 'Сложнейшие работы по изменению траектории дрейфа опасных ледовых объектов',
    image: '/media/project/slider-1.jpg'
  },
  {
    title: 'В объективах наших камер 2',
    description:
      'Сложнейшие работы по изменению траектории дрейфа опасных ледовых объектов по изменению траектории дрейфа опасных ледовых объектов',
    image: '/media/project/slider-2.jpg'
  },
  {
    title: 'В объективах наших камер 3',
    description:
      'Сложнейшие работы по изменению траектории дрейфа опасных ледовых объектов по изменению траектории дрейфа опасных ледовых объектов по изменению траектории дрейфа опасных ледовых объектов',
    image: '/media/project/slider-1.jpg'
  }
]

const ProjectPage = () => {
  const {isMobile, isDesktop} = useMedia()
  const [swiper, setSwiper] = useState<SwiperType>()

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const onSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <Page className={styles.page} scrollButton={isDesktop}>
      <Helmet>
        <title>История одного проекта</title>
      </Helmet>

      <section className={styles.wrapper}>
        <h1>
          История <br /> одного <img src={compassSVG} alt='compass' /> проекта
        </h1>

        <div className={styles.arctic}>
          <img src={arcticIMG} alt='arctic' />

          <h2>Арктика</h2>
          <p>
            Уникальный регион, привлекающий многих своей труднодоступностью и невероятной природой. Именно здесь
            началась история нашей компании.
          </p>

          <div className={styles.globe}>
            {isDesktop ? <GlobeArcticSVG className={styles.globeSvg} /> : <GlobeSVG className={styles.globeSvg} />}
          </div>
        </div>

        <img className={styles.ship} src={shipIMG1} alt='ship' />

        <div className={styles.shipInfo}>
          <div className={styles.top}>
            {isDesktop && <p>Мы снимали, жили, ели и спали на 4 плавучих буровых установках</p>}
            <img src={shipBuildingIMG} alt='ship building' />
          </div>

          <div className={styles.bottom}>
            {isDesktop && <img src={bearIMG} alt='bear' />}
            <p>
              С 2019 года ПРОМВИЗИО является эксклюзивным поставщиком фото- и видеоконтента о ежегодных учениях
              аварийно-спасательных формирований на арктическом шельфе РФ, в рамках которых выполняются такие уникальные
              операции, как буксировка айсбергов.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.swiperWrapper}>
        <>
          <Swiper
            className={styles.swiper}
            slidesPerView={isMobile ? 'auto' : 1}
            speed={600}
            onSwiper={(swiper: SetStateAction<SwiperType | undefined>) => setSwiper(swiper)}
            spaceBetween={isDesktop ? 24 : 8}
            onSlideChange={onSlideChange}
            autoplay={{delay: 2500, disableOnInteraction: false}}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={styles.slide}>
                  {isDesktop && (
                    <div className={styles.text}>
                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                    </div>
                  )}
                  <img src={slide.image} alt='slider image' />
                </div>
              </SwiperSlide>
            ))}

            {isDesktop && (
              <div className={styles.navigation}>
                <SliderButton onClick={() => swiper?.slidePrev()} disabled={isBeginning} className={styles.arrow} />
                <SliderButton onClick={() => swiper?.slideNext()} next disabled={isEnd} className={styles.arrow} />
              </div>
            )}
          </Swiper>
        </>
      </section>

      <section className={styles.wrapper}>
        <div className={styles.proud}>
          <div className={styles.left}>
            <GlobeSVG className={styles.globe} />
            <p>Любим и умеем снимать сложные работы в удалённых местах</p>
          </div>

          <div className={styles.right}>
            <p>Мы гордимся нашим эксклюзивным опытом работы в Арктике и готовы к новым вызовам.</p>
          </div>
        </div>

        <div className={styles.visited}>
          <img className={styles.ship} src={shipIMG2} alt='ship' />

          <div className={styles.drove}>
            <img className={styles.view} src={viewFromShipIMG} alt='view from ship' />

            <div className={styles.miles}>
              <span>45 000</span>
              <p>
                Морских миль мы преодолели <br /> на ледоколах. Это две окружности Земли
              </p>
            </div>
          </div>

          <p className={styles.text}>
            В рамках проектов мы побывали на трёх архипелагах российской Арктики: Новая Земля, Северная Земля и Земля
            Франца-Иосифа.
          </p>

          <img className={styles.image} src={shipIMG3} alt='ship' />
        </div>
      </section>
    </Page>
  )
}

export default ProjectPage
