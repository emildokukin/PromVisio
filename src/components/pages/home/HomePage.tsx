import styles from './HomePage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import Help, {HelpItem} from './Help'
import Reviews, {Review} from './Reviews'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay} from 'swiper'
import useMedia from '../../utils/useMedia'

const HELP_ITEMS: HelpItem[] = [
  {
    title: 'Укрепить имидж компании',
    text: 'Наш контент демонстрировался на ПМЭФ, ВЭФ, Транспортной неделе, Международном арктическом форуме. Заявите о себе в профессиональном сообществе.'
  },
  {
    title: 'Показать сложность деятельности',
    text: 'Наш контент демонстрировался на ПМЭФ, ВЭФ, Транспортной неделе, Международном арктическом форуме. Заявите о себе в профессиональном сообществе.'
  },
  {
    title: 'Повысить престиж профессии',
    text: 'Наш контент демонстрировался на ПМЭФ, ВЭФ, Транспортной неделе, Международном арктическом форуме. Заявите о себе в профессиональном сообществе.'
  },
  {
    title: 'Поднять уровень охраны труда',
    text: 'Наш контент демонстрировался на ПМЭФ, ВЭФ, Транспортной неделе, Международном арктическом форуме. Заявите о себе в профессиональном сообществе.'
  },
  {
    title: (
      <>
        Привлечь внимание
        <br /> к экологической ответственности
      </>
    ),
    text: 'Наш контент демонстрировался на ПМЭФ, ВЭФ, Транспортной неделе, Международном арктическом форуме. Заявите о себе в профессиональном сообществе.'
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
    image: '/media/home/aurora.png'
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
  },
  {
    title: '«Был создан качественный имиджевый медиапродукт, который отображает компетенции и опыт специалистов»',
    signature: '/media/home/signature-2.png',
    format: 'PDF',
    link: '#',
    name: 'С.А. Обухов',
    role: 'Заместитель генерального директора по строительству скважин',
    image: '/media/home/aurora.png'
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

const HomePage = () => {
  const {isMobile, isDesktop} = useMedia()

  return (
    <Page floatingHireButton>
      <Helmet>
        <title>Главная</title>
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
            произведённый нашей компанией,демонстрировался на тематических мероприятиях высшего уровня: ПМЭФ, ВЭФ,
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

      <section className={styles.team}>
        <h1>
          Команда и <br />
          оборудование
        </h1>

        <h2>
          Специалисты ПРОМВИЗИО – это операторы, пилоты БВС, монтажёры и видеографы с уникальным опытом индустриального
          видеопроизводства.
          {isDesktop && (
            <span className={styles.icons}>
              <img src='/icons/lightning.svg' alt='lightning' />
              <img src='/icons/lightning.svg' alt='lightning' />
            </span>
          )}
        </h2>

        <Swiper
          className={styles.swiper}
          modules={[Autoplay]}
          slidesPerView={isMobile ? 1.15 : 3.5}
          grabCursor
          loop
          speed={600}
          autoplay={{delay: 2500, disableOnInteraction: false}}
        >
          {[1, 2, 3, 4, 1, 2, 3, 4].map((slide, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <img src={`/media/home/slide-${slide}.jpg`} alt='team picture' />
            </SwiperSlide>
          ))}
        </Swiper>

        <h3>
          Все сотрудники, задействованные в съёмочном процессе на производственных объектах, снабжены персональными СИЗ,
          имеют актуальные удостоверения по охране труда, а также действующие сертификаты BOSIET/FOET. При необходимости
          наши специалисты могут пройти необходимое специализированное дополнительное обучение.
        </h3>
      </section>
    </Page>
  )
}

export default HomePage
