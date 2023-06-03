import clsx from 'clsx'
import {ReactComponent as GlobeSVG} from '../../../icons/globe.svg'
import LinkComponent from '../link-component/LinkComponent'
import styles from './NewsInnerLink.module.scss'

interface NewsInnerLink {
  link: string
  className?: string
}

const NewsInnerLink = ({link, className}: NewsInnerLink) => (
  <object className={clsx(className)}>
    <GlobeSVG className={styles.globe} />
    <LinkComponent className={styles.link} link={link} linkExternal={true}>
      Новость на сайте Газпрома
    </LinkComponent>
  </object>
)

export default NewsInnerLink
