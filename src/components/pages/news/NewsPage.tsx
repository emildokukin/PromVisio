import styles from './NewsPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import NewsItem from './NewsItem'
import NewsPagination from './NewsPagination'
import newsArrow from '../../../icons/news-arrow.svg'
import useMedia from '../../utils/useMedia'

interface News {
  id: number
  title: string
  description: string
  date: string
  linkToGazprom?: string
  mediaLinks: string[]
}

const news: News[] = [
  {
    id: 0,
    title: 'Арктические учения 2020 1',
    description:
      'Компания "Промвизио" успешно завершила первый проект по фото- и видеосъёмке учений аварийно-спасательных формирований в Карском море.',
    date: '12.05.2023',
    linkToGazprom: 'google.com',
    mediaLinks: [
      'https://media.istockphoto.com/id/1461832048/photo/long-exposure-sunset-reflections-on-lake.jpg?b=1&s=170667a&w=0&k=20&c=s_aZy_7QK79mtA20QL1Dc5Of4Be48vt-tEVnKdssUdg=',
      'https://cdn.boatinternational.com/convert/files/2020/12/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.jpg/r%5Bwidth%5D=1920/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.webp',
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
      'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg'
    ]
  },
  {
    id: 1,
    title: 'Длинный заголовок в две или даже в три строки 2',
    description: 'Компания Промвизио успешно завершила.',
    date: '10.03.2023',
    mediaLinks: [
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
      'https://cdn.boatinternational.com/convert/files/2020/12/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.jpg/r%5Bwidth%5D=1920/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.webp',
      'https://media.istockphoto.com/id/1461832048/photo/long-exposure-sunset-reflections-on-lake.jpg?b=1&s=170667a&w=0&k=20&c=s_aZy_7QK79mtA20QL1Dc5Of4Be48vt-tEVnKdssUdg=',
      'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg'
    ]
  },
  {
    id: 2,
    title: 'Длинный заголовок в две или даже в три строки 3',
    description: 'Компания Промвизио успешно завершила.',
    date: '10.03.2023',
    mediaLinks: [
      'https://cdn.boatinternational.com/convert/files/2020/12/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.jpg/r%5Bwidth%5D=1920/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.webp',
      'https://media.istockphoto.com/id/1461832048/photo/long-exposure-sunset-reflections-on-lake.jpg?b=1&s=170667a&w=0&k=20&c=s_aZy_7QK79mtA20QL1Dc5Of4Be48vt-tEVnKdssUdg=',
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
      'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg'
    ]
  },
  {
    id: 3,
    title: 'Арктические учения 2500 4',
    description:
      'Компания Промвизио успешно завершила первый проект по фото- и видеосъёмке учений аварийно-спасательных формирований в Карском море.',
    date: '01.12.2020',
    linkToGazprom: 'google.com',
    mediaLinks: [
      'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg',
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
      'https://cdn.boatinternational.com/convert/files/2020/12/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.jpg/r%5Bwidth%5D=1920/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.webp',
      'https://media.istockphoto.com/id/1461832048/photo/long-exposure-sunset-reflections-on-lake.jpg?b=1&s=170667a&w=0&k=20&c=s_aZy_7QK79mtA20QL1Dc5Of4Be48vt-tEVnKdssUdg='
    ]
  },
  {
    id: 4,
    title: 'Арктические учения 2500 5',
    description:
      'Компания Промвизио успешно завершила первый проект по фото- и видеосъёмке учений аварийно-спасательных формирований в Карском море.',
    date: '01.12.2020',
    linkToGazprom: 'google.com',
    mediaLinks: [
      'https://media.istockphoto.com/id/1461832048/photo/long-exposure-sunset-reflections-on-lake.jpg?b=1&s=170667a&w=0&k=20&c=s_aZy_7QK79mtA20QL1Dc5Of4Be48vt-tEVnKdssUdg=',
      'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg',
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
      'https://cdn.boatinternational.com/convert/files/2020/12/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.jpg/r%5Bwidth%5D=1920/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.webp'
    ]
  }
]

const NewsPage = () => {
  const {isMobile} = useMedia()

  return (
    <Page floatingHireButton>
      <Helmet>
        <title>Новости</title>
      </Helmet>

      <section className={styles.news}>
        <h1>Вестник</h1>

        <div className={styles.newsContainer}>
          {news.map(function (newsItem, index) {
            return [
              index == 2 ? (
                <div className={styles.readArcticHistoryContainer}>
                  <div className={styles.readArcticHistoryInnerContainer}>
                    <img src={newsArrow} alt='arrow' />
                    <h2>Почитать историю проекта в Арктике</h2>
                  </div>
                </div>
              ) : (
                <NewsItem
                  key={newsItem.id}
                  title={newsItem.title}
                  description={newsItem.description}
                  imgLink={newsItem.mediaLinks[0]}
                  date={newsItem.date}
                  linkToGazprom={newsItem.linkToGazprom}
                  linkToNewsItem={newsItem.id.toString()}
                />
              ),
              index % 2 !== 0 || index == news.length - 1 || isMobile ? <hr /> : []
            ]
          })}
        </div>
        <NewsPagination />
      </section>
    </Page>
  )
}

export default NewsPage
