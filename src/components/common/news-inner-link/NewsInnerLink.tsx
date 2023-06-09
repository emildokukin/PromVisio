import clsx from 'clsx'
import {ReactComponent as GlobeSVG} from '../../../icons/globe.svg'
import LinkComponent from '../link-component/LinkComponent'
import styles from './NewsInnerLink.module.scss'

interface NewsInnerLink {
  link?: string
  text?: string
  className?: string
}

const NewsInnerLink = ({link, text, className}: NewsInnerLink) => (
  <object className={clsx(className)}>
    <LinkComponent className={styles.link} link={link} linkExternal>
      <GlobeSVG className={styles.globe} />
      {text}
    </LinkComponent>
  </object>
)

export default NewsInnerLink
