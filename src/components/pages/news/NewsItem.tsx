import LinkComponent from '../../common/link-component/LinkComponent'
import styles from './NewsItem.module.scss'
import NewsInnerLink from '../../common/news-inner-link/NewsInnerLink'
import useMedia from '../../utils/useMedia'
import {Image} from '../../utils/types'
import {Source} from './types'

export interface NewsItemProps {
  title: string
  description: string
  image?: Image
  date: Date
  link: string
  innerLink: Source | null
}

const NewsItem = ({title, description, image, date, innerLink, link}: NewsItemProps) => {
  const {isDesktop} = useMedia()

  return (
    <LinkComponent className={styles.wrapper} link={link}>
      {!!image && <img className={styles.image} src={image.url} alt={image.alt} />}

      <div className={styles.info}>
        <h2>{title}</h2>

        <p>{description}</p>

        <div className={styles.infoBottom}>
          <time>
            {new Date(date).toLocaleDateString()} {innerLink && isDesktop && ' •'}
          </time>

          {innerLink && <NewsInnerLink link={innerLink?.link} text={innerLink?.label} />}
        </div>
      </div>
    </LinkComponent>
  )
}

export default NewsItem
