import LinkComponent from '../../common/link-component/LinkComponent'
import styles from './NewsItem.module.scss'
import GazpromLink from '../../common/gazpromLink/GazpromLink'
import useMedia from '../../utils/useMedia'

interface NewsItem {
  title: string
  description: string
  imgLink: string
  date: string
  linkToGazprom?: string
  linkToNewsItem: string
}

const NewsItem = ({title, description, imgLink, date, linkToGazprom, linkToNewsItem}: NewsItem) => {
  const {isDesktop} = useMedia()

  return (
    <LinkComponent className={styles.container} link={linkToNewsItem}>
      <img className={styles.image} src={imgLink} alt='ship' />
      <div className={styles.textContainer}>
        <h2>{title}</h2>

        <p>{description}</p>
        <div className={styles.dateAndLink}>
          <time>{linkToGazprom && isDesktop ? date.toString() + ' •' : date}</time>
          {linkToGazprom && <GazpromLink linkToGazprom={linkToGazprom} />}
        </div>
      </div>
    </LinkComponent>
  )
}

export default NewsItem
