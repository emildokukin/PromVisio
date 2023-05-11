import styles from './HomePage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'


const HomePage = () => {
  return (
    <Page className={styles.page}>
      <Helmet>
        <title>Главная</title>
      </Helmet>

      
    </Page>
  )
}

export default HomePage
