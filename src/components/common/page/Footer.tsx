import HireButton from '../hire-button/HireButton'
import LinkComponent from '../link-component/LinkComponent'
import styles from './Footer.module.scss'
import {ReactComponent as Phone} from '../../../icons/phone-small.svg'

interface FooterProps {
  showHireButton?: boolean
}

const Footer = ({showHireButton}: FooterProps) => {
  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.info}>
        <div className={styles.socials}>
          <LinkComponent link='#' linkExternal className={styles.social}>
            <img src='/icons/dzen.svg' alt='dzen' />
          </LinkComponent>

          <LinkComponent link='#' linkExternal className={styles.social}>
            <img src='/icons/youtube.svg' alt='youtube' />
          </LinkComponent>

          <LinkComponent link='emailto:info@promvisio.ru' className={styles.email}>
            <h2>info@promvisio.ru</h2>
          </LinkComponent>
        </div>

        <hr />

        <p className={styles.copyright}>© 2023 «ПРОМВИЗИО»</p>
      </div>

      <div className={styles.action}>
        <LinkComponent link='tel:+79039689048' className={styles.phone}>
          <div className={styles.social}>
            <Phone />
          </div>

          <h2>+7 (903) 968 9048</h2>
        </LinkComponent>

        {showHireButton && <HireButton />}
      </div>
    </footer>
  )
}

export default Footer
