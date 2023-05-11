import styles from './HomePage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import HireButton from '../../common/hire-button/HireButton'
import Help, {HelpItem} from './Help'

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

const HomePage = () => {
  return (
    <Page className={styles.page}>
      <Helmet>
        <title>Главная</title>
      </Helmet>

      <section className={styles.banner}>
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

            <HireButton />
          </div>
        </div>
      </section>

      <Help items={HELP_ITEMS} />

      <section className={styles.customers}>
        <div className={styles.content}>
          <h1>Нас привлекают</h1>

          <h3>
            На сегодняшний день основными заказчиками ПРОМВИЗИО являются компании нефтегазового сектора, ведущие
            деятельность на континентальном шельфе Российской федерации, а также организации, выполняющие
            вспомогательные функции при таких работах.
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
    </Page>
  )
}

export default HomePage
