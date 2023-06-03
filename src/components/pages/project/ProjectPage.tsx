import styles from './ProjectPage.module.scss'
import compassSVG from '../../../icons/compass.svg'
import {ReactComponent as GlobeSVG} from '../../../icons/globe-arctic.svg'
import shipIMG from '../../../../public/media/arctic/ship.jpg'
import shipBuildingIMG from '../../../../public/media/arctic/ship-building.jpg'
import bearIMG from '../../../../public/media/arctic/bear.jpg'

import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, Swiper as SwiperType} from 'swiper'
import useMedia from '../../utils/useMedia'
import {SetStateAction, useState} from 'react'
import SliderButton from '../../common/slider/SliderButton'

interface Slides {
  title: string
  description: string
}

const ProjectPage = () => {
  const {isMobile} = useMedia()
  const [swiper, setSwiper] = useState<SwiperType>()

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const onSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const slides: Slides[] = [
    {
      title: 'В объективах наших камер',
      description: 'Сложнейшие работы по изменению траектории дрейфа опасных ледовых объектов'
    },
    {
      title: 'В объективах наших камер 2',
      description:
        'Сложнейшие работы по изменению траектории дрейфа опасных ледовых объектов по изменению траектории дрейфа опасных ледовых объектов'
    },
    {
      title: 'В объективах наших камер 3',
      description:
        'Сложнейшие работы по изменению траектории дрейфа опасных ледовых объектов по изменению траектории дрейфа опасных ледовых объектов по изменению траектории дрейфа опасных ледовых объектов'
    }
  ]

  return (
    <Page className={styles.page}>
      <Helmet>
        <title>История одного проекта</title>
      </Helmet>

      <div className={styles.wrapper}>
        <h1>
          История <br /> одного <img src={compassSVG} alt='compass' /> проекта
        </h1>

        <div className={styles.arctic}>
          <img src='/media/arctic/arctic.jpg' alt='arctic' />

          <h2>Арктика</h2>
          <p>
            Уникальный регион, привлекающий многих своей труднодоступностью и невероятной природой. Именно здесь
            началась история нашей компании.
          </p>

          <div className={styles.globe}>
            <GlobeSVG className={styles.globeSvg} />
          </div>
        </div>

        <img className={styles.shipPicture} src={shipIMG} alt='ship' />

        <div className={styles.underShipWrapper}>
          <div className={styles.top}>
            <p>Мы снимали, жили, ели и спали на 4 плавучих буровых установках</p>
            <img src={shipBuildingIMG} alt='ship building' />
          </div>

          <div className={styles.bottom}>
            <img src={bearIMG} alt='bear' />
            <p>
              С 2019 года ПРОМВИЗИО является эксклюзивным поставщиком фото- и видеоконтента о ежегодных учениях
              аварийно-спасательных формирований на арктическом шельфе РФ, в рамках которых выполняются такие уникальные
              операции, как буксировка айсбергов.
            </p>
          </div>
        </div>

        <div className='wrapperSwiper'>
          <>
            <Swiper
              className={styles.swiper}
              modules={[Autoplay]}
              slidesPerView={isMobile ? 'auto' : 1}
              speed={600}
              onSwiper={(swiper: SetStateAction<SwiperType | undefined>) => setSwiper(swiper)}
              spaceBetween={32}
              direction={isMobile ? 'vertical' : 'horizontal'}
              onSlideChange={onSlideChange}
              autoplay={{delay: 2500, disableOnInteraction: false}}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.navigation}>
              <SliderButton onClick={() => swiper?.slidePrev()} disabled={isBeginning} className={styles.arrow} />
              <SliderButton onClick={() => swiper?.slideNext()} next disabled={isEnd} className={styles.arrow} />
            </div>
          </>
        </div>
      </div>
    </Page>
  )
}

export default ProjectPage
