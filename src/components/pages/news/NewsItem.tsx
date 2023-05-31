import LinkComponent from '../../common/link-component/LinkComponent'
import styles from './NewsItem.module.scss'
import globeSvg from '../../../../public/icons/globe.svg'

interface NewsItem {
  title: string
  description: string
  imgLink: string
  date: string
  linkToGazprom?: string
  linkToNewsItem: string
}

const NewsItem = ({title, description, imgLink, date, linkToGazprom, linkToNewsItem}: NewsItem) => {
  return (
    <LinkComponent className={styles.container} link={linkToNewsItem}>
      <img className={styles.image} src={imgLink} alt='ship' />
      <div className={styles.textContainer}>
        <h2>{title}</h2>

        <h3>{description}</h3>
        <div className={styles.dateAndLink}>
          <time>
            {date} {linkToGazprom && '•'}
          </time>
          {linkToGazprom && (
            <object>
              <img className={styles.globeSvg} src={globeSvg} alt='globe' />
              <LinkComponent className={styles.linkToGazprom} link={linkToGazprom} linkExternal={true}>
                Новость на сайте Газпрома
              </LinkComponent>
            </object>
          )}
        </div>
      </div>
    </LinkComponent>
  )
}

export default NewsItem
