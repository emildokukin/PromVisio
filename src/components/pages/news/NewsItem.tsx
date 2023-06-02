import LinkComponent from '../../common/link-component/LinkComponent'
import styles from './NewsItem.module.scss'
import GazpromLink from '../../common/gazprom-link/GazpromLink'
import useMedia from '../../utils/useMedia'

export interface NewsItemProps {
  title: string
  description: string
  imgLink: string
  date: string
  linkToGazprom?: string
  linkToNewsItem: string
}

const NewsItem = ({title, description, imgLink, date, linkToGazprom, linkToNewsItem}: NewsItemProps) => {
  const {isDesktop} = useMedia()

  return (
    <LinkComponent className={styles.wrapper} link={linkToNewsItem}>
      <img className={styles.image} src={imgLink} alt='ship' />

      <div className={styles.info}>
        <h2>{title}</h2>

        <p>{description}</p>

        <div className={styles.infoBottom}>
          <time>{linkToGazprom && isDesktop ? date.toString() + ' •' : date}</time>
          {linkToGazprom && <GazpromLink linkToGazprom={linkToGazprom} />}
        </div>
      </div>
    </LinkComponent>
  )
}

export default NewsItem
