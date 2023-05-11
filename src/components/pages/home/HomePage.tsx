import styles from './HomePage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import HireButton from '../../common/hire-button/HireButton'

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
    </Page>
  )
}

export default HomePage
