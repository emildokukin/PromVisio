import styles from './HomePage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import Help, {HelpItem} from './Help'
import Reviews, {Review} from './Reviews'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay} from 'swiper'
import useMedia from '../../utils/useMedia'
import clsx from 'clsx'
import CurvedText from '../../common/curved-text/CurvedText'
import {useContext} from 'react'
import {HireFormModalContext} from '../../common/modal/FormModalContext'
import PreviewContext from '../../utils/preview'
import {useQueryFindData} from '../../utils/useQueryData'
import {Data, HomeData, blockTypes} from './types'
import useParsedData from '../../utils/useParsedData'
import Loading from '../../common/loading/Loading'
import {Image} from '../../utils/types'

const HELP_ITEMS: HelpItem[] = [
  {
    title: 'Укрепить имидж компании',
    text: 'Наш контент демонстрировался на ПМЭФ, ВЭФ, Транспортной неделе, Международном арктическом форуме. Заявите о себе в профессиональном сообществе.'
  },
  {
    title: 'Показать сложность деятельности',
    text: 'Мы снимали буксировку айсбергов, подрыв якорей плавучей буровой установки и бункеровку ледокольного судна. Наглядно продемонстрируйте высокий уровень своей компетенции.'
  },
  {
    title: 'Повысить престиж профессии',
    text: 'Трудовые будни и быт капитана ледокола, спасателя, буровика, промышленного медика, докера. Возможность взглянуть на работу редких специалистов со стороны воодушевит действующих сотрудников и привлечёт новых.'
  },
  {
    title: 'Поднять уровень охраны труда',
    text: 'Отчётные видеоролики позволят в динамике объективно оценить уровень реагирования на внештатные ситуации и предупредить их. Соответствуйте высоким стандартам.'
  },
  {
    title: (
      <>
        Привлечь внимание
        <br /> к экологической ответственности
      </>
    ),
    text: 'На ежегодных арктических учениях нефтегазовые компании используют экологически чистые сорбенты и бережно относятся к окружающей среде региона, демонстрируя природоохранную составляющую бизнеса.'
  }
]

const REVIEWS: Review[] = [
  {
    title: '«Работы выполнены на высоком профессиональном уровне, в полном объеме, с надлежащим качеством»',
    signature: '/media/home/signature-1.png',
    format: 'PDF',
    link: '#',
    name: 'В.В. Черепанов',
    role: 'Генеральный директор • ООО «Газпром Недра»',
    image: '/media/home/gazprom-nedra.png'
  },
  {
    title: '«Был создан качественный имиджевый медиапродукт, который отображает компетенции и опыт специалистов»',
    signature: '/media/home/signature-2.png',
    format: 'PDF',
    link: '#',
    name: 'С.А. Обухов',
    role: 'Заместитель генерального директора по строительству скважин',
    image: '/media/home/customer-left-1.svg'
  },
  {
    title: '«Четкая организация труда, высокий профессионализм отвечают требованиям ООО «Газпром недра»',
    signature: '/media/home/signature-3.png',
    format: 'PDF',
    link: '#',
    name: 'В.Л. Плотников',
    role: 'Заместитель генерального директора — главный инженер',
    image: '/media/home/gazprom-nedra.png'
  },
  {
    title:
      '«За успешное выполнение работ по фото- и видеосъемке комплексных морских учений аварийно-спасательных формирований в акватории Карского моря»',
    signature: '/media/home/signature-4.png',
    format: 'PDF',
    link: '#',
    name: 'В.Ю. Слободян',
    role: 'Генеральный директор • ИЭПИ',
    image: '/media/home/institute.png'
  }
]

interface Slide {
  items: Image[] | undefined
  className?: string
}

export const Slider = ({className, items}: Slide) => {
  const {isMobile} = useMedia()

  return (
    <Swiper
      className={clsx(styles.swiper, className)}
      modules={[Autoplay]}
      slidesPerView={isMobile ? 1.15 : 3.5}
      grabCursor
      loop
      speed={600}
      autoplay={{delay: 2500, disableOnInteraction: false}}
    >
      {((items?.length || 0) <= 7 ? items?.concat(items) : items)?.map((slide, index) => (
        <SwiperSlide className={styles.slide} key={index}>
          <img src={slide.url} alt={slide.alt} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const HomePage = () => {
  const {isDesktop} = useMedia()
  const {toggle: formToggle} = useContext(HireFormModalContext)
  const {preview} = useContext(PreviewContext)
  const {data, isLoading} = useQueryFindData<HomeData>(['home'])
  const {parsedData} = useParsedData<Data>(data?.content, preview?.content, [...blockTypes])

  return (
    <Page scrollButton={isDesktop} className={styles.page}>
      <Helmet>
        <title>{data?.title || 'Главная'}</title>
      </Helmet>

      <section className={styles.banner}>
        <video
          className={styles.video}
          src='/media/home/video.mp4'
          width='100%'
          height='100%'
          itemType='video/mp4'
          autoPlay
          playsInline
          loop
          muted
        />
        <img className={styles.image} src='/media/home/banner.png' alt='helicopter flying near ship' />

        <div className={styles.content}>
          <h1>
            мы <img src='/icons/camera.svg' /> снимаем
            <br /> промышленность
          </h1>

          <div className={styles.info}>
            <h2>
              Создаем фото- и видеоконтент
              <br />
              для реализации корпоративных
              <br />и производственных задач.
              <br />
              Даже в самых сложных условиях.
            </h2>
          </div>
        </div>
      </section>

      <Help items={HELP_ITEMS} />

      <section className={styles.customers}>
        <div className={styles.content}>
          <h1>Нас привлекают</h1>

          <h3>
            На сегодняшний день основными заказчиками ПРОМВИЗИО являются компании нефтегазового сектора, а контент,
            произведённый нашей компанией, демонстрировался на тематических мероприятиях высшего уровня: ПМЭФ, ВЭФ,
            Арктический форум, Транспортная неделя, заседания Русского географического общества.
            <img src='/icons/fire.svg' alt='fire lit' />
          </h3>

          <div className={styles.images}>
            <ul className={styles.left}>
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <img src={'/media/home/customer-left-' + (index + 1) + '.svg'} alt='customer logo' />
                  </li>
                ))}
            </ul>

            <hr className={styles.line} />

            <ul className={styles.right}>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <img src={'/media/home/customer-right-' + (index + 1) + '.svg'} alt='customer logo' />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <Reviews items={REVIEWS} />

      {isLoading ? (
        <Loading />
      ) : (
        <section className={styles.team}>
          <h1>{parsedData?.team?.title}</h1>

          <h2>
            {parsedData?.team?.text1}

            {isDesktop && (
              <span className={styles.icons}>
                <img src='/icons/lightning.svg' alt='lightning' />
                <img src='/icons/lightning.svg' alt='lightning' />
              </span>
            )}
          </h2>

          <Slider items={parsedData?.team?.images} />

          <div className={styles.members}>
            <h3>{parsedData?.team?.text2}</h3>

            {isDesktop ? (
              <CurvedText
                size={160}
                radius={52}
                text='ХОЧУ В КОМАНДУ —  ХОЧУ В КОМАНДУ —  '
                textFontSize={16}
                textFontWeight={700}
                speed={0.3}
                symbol={<img src='/icons/circle-plus.svg' />}
                className={styles.participate}
                onClick={formToggle}
              />
            ) : (
              <p className={styles.participate} onClick={formToggle}>
                <img src='/icons/circle-plus-mobile.svg' /> Хочу в команду
              </p>
            )}
          </div>
        </section>
      )}
    </Page>
  )
}

export default HomePage
