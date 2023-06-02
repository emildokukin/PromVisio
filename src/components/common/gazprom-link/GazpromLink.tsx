import clsx from 'clsx'
import globeSvg from '../../../icons/globe.svg'
import LinkComponent from '../link-component/LinkComponent'
import styles from './GazpromLink.module.scss'

interface GazpromLink {
  linkToGazprom: string
  className?: string
}

const GazpromLink = ({linkToGazprom, className}: GazpromLink) => {
  return (
    <object className={clsx(className)}>
      <img className={styles.globeSvg} src={globeSvg} alt='globe' />
      <LinkComponent className={styles.linkToGazprom} link={linkToGazprom} linkExternal={true}>
        Новость на сайте Газпрома
      </LinkComponent>
    </object>
  )
}

export default GazpromLink