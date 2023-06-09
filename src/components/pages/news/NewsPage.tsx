import styles from './NewsPage.module.scss'
import Page from '../../common/page/Page'
import {Helmet} from 'react-helmet-async'
import NewsItem from './NewsItem'
import Pagination from './Pagination'
import arrowSVG from '../../../icons/arrow-circleless.svg'
import useMedia from '../../utils/useMedia'
import {Fragment, useCallback, useContext, useEffect, useState} from 'react'
import clsx from 'clsx'
import LinkComponent from '../../common/link-component/LinkComponent'
import {useQueryFindData} from '../../utils/useQueryData'
import PreviewContext from '../../utils/preview'
import {Article, Articles, NewsData} from './types'
import Loading from '../../common/loading/Loading'
import API from '../../utils/API'
import {ENDPOINT} from '../../utils/endpoints'

export interface Line {
  className?: string
}

export const Line = ({className}: Line) => <hr className={clsx(styles.line, className)} />

const CIRCLE_INDEX = 3

const NewsPage = () => {
  const {isMobile} = useMedia()
  const {preview} = useContext(PreviewContext)
  const {data, isLoading} = useQueryFindData<NewsData>(['news'])
  const [news, setNews] = useState<Article[]>()

  const parsedData = preview ? preview : data

  useEffect(() => {
    setNews(parsedData?.articles?.results)
  }, [preview, data])

  const fetchData = useCallback(
    async (page: number) => {
      const data = await API.GET(`${ENDPOINT.articles}/${parsedData?.id}/`, {params: {page: page}}).then(
        (res) => res.data as Articles
      )

      setNews(data.results)
    },
    [preview, data]
  )

  return (
    <Page>
      <Helmet>
        <title>{parsedData?.title || 'Вестник'}</title>
      </Helmet>

      {isLoading ? (
        <Loading />
      ) : (
        <section className={styles.news}>
          <h1>{parsedData?.heading || 'Вестник'}</h1>

          <div className={styles.newsWrapper}>
            {news?.map((item, index) => (
              <Fragment key={index}>
                {index === CIRCLE_INDEX ? (
                  <>
                    <LinkComponent link='/project' className={styles.circleWrapper}>
                      <div className={styles.circle}>
                        <img src={arrowSVG} alt='arrow' />
                        <h2>Почитать историю проекта в Арктике</h2>
                      </div>
                    </LinkComponent>

                    <Line />
                  </>
                ) : null}

                <NewsItem
                  key={item?.url}
                  title={item?.title}
                  description={item?.preview_text}
                  image={item?.banner}
                  date={item?.datetime}
                  link={item?.url}
                  innerLink={item?.source}
                />

                {isMobile || (index % 2 !== 0 && index !== CIRCLE_INDEX) || index === news.length - 1 ? <Line /> : null}
              </Fragment>
            ))}
          </div>

          <Pagination className={styles.dots} totalPages={parsedData?.articles?.total_pages} onDotClick={fetchData} />
        </section>
      )}
    </Page>
  )
}

export default NewsPage
