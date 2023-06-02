import LinkComponent from '../../common/link-component/LinkComponent'
import styles from './NewsItem.module.scss'
import NewsInnerLink from '../../common/news-inner-link/NewsInnerLink'
import useMedia from '../../utils/useMedia'

export interface NewsItemProps {
  title: string
  description: string
  imgLink: string
  date: string
  innerLink?: string
  link: string
}

const NewsItem = ({title, description, imgLink, date, innerLink, link}: NewsItemProps) => {
  const {isDesktop} = useMedia()

  return (
    <LinkComponent className={styles.wrapper} link={link}>
      <img className={styles.image} src={imgLink} alt='ship' />

      <div className={styles.info}>
        <h2>{title}</h2>

        <p>{description}</p>

        <div className={styles.infoBottom}>
          <time>{innerLink && isDesktop ? date.toString() + ' •' : date}</time>
          {innerLink && <NewsInnerLink link={innerLink} />}
        </div>
      </div>
    </LinkComponent>
  )
}

export default NewsItem
