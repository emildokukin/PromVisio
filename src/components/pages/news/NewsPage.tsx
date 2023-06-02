import styles from './NewsPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import NewsItem from './NewsItem'
import NewsPagination from './NewsPagination'
import arrowSVG from '../../../icons/arrow-circleless.svg'
import useMedia from '../../utils/useMedia'
import {Fragment} from 'react'
import clsx from 'clsx'

export interface News {
  id: number
  title: string
  description: string
  date: string
  linkToGazprom?: string
  mediaLinks: string[]
}

export interface Line {
  className?: string
}

export const news: News[] = [
  {
    id: 0,
    title: 'Арктические учения 2020 1',
    description:
      'Компания "Промвизио" успешно завершила первый проект по фото- и видеосъёмке учений аварийно-спасательных формирований в Карском море.',
    date: '12.05.2023',
    linkToGazprom: 'google.com',
    mediaLinks: [
      '/media/gallery/photo1.png',
      '/media/gallery/photo2.png',
      '/media/gallery/photo3.png',
      '/media/gallery/photo4.png'
    ]
  },
  {
    id: 1,
    title: 'Длинный заголовок в две или даже в три строки 2',
    description: 'Компания Промвизио успешно завершила.',
    date: '10.03.2023',
    mediaLinks: [
      '/media/gallery/photo2.png',
      '/media/gallery/photo1.png',
      '/media/gallery/photo3.png',
      '/media/gallery/photo4.png'
    ]
  },
  {
    id: 2,
    title: 'Длинный заголовок в две или даже в три строки 3',
    description: 'Компания Промвизио успешно завершила.',
    date: '10.03.2023',
    mediaLinks: [
      '/media/gallery/photo3.png',
      '/media/gallery/photo1.png',
      '/media/gallery/photo2.png',
      '/media/gallery/photo4.png'
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
      '/media/gallery/photo4.png',
      '/media/gallery/photo1.png',
      '/media/gallery/photo2.png',
      '/media/gallery/photo3.png'
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
      '/media/gallery/photo1.png',
      '/media/gallery/photo2.png',
      '/media/gallery/photo3.png',
      '/media/gallery/photo4.png'
    ]
  }
]

export const Line = ({className}: Line) => <hr className={clsx(styles.line, className)} />

const NewsPage = () => {
  const {isMobile} = useMedia()

  return (
    <Page floatingHireButton>
      <Helmet>
        <title>Новости</title>
      </Helmet>

      <section className={styles.news}>
        <h1>Вестник</h1>

        <div className={styles.newsWrapper}>
          {news.map((newsItem, index) => (
            <Fragment key={index}>
              {index === 3 ? (
                <div className={styles.circleWrapper}>
                  <div className={styles.circle}>
                    <img src={arrowSVG} alt='arrow' />
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
              )}

              {index % 2 !== 0 || index == news.length - 1 || isMobile ? <Line /> : null}
            </Fragment>
          ))}
        </div>

        <NewsPagination />
      </section>
    </Page>
  )
}

export default NewsPage
