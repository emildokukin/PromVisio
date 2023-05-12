import HireButton from '../hire-button/HireButton'
import LinkComponent from '../link-component/LinkComponent'
import styles from './Footer.module.scss'
import {ReactComponent as PhoneSVG} from '../../../icons/phone-small.svg'
import {ReactComponent as Envelope} from '../../../icons/envelope.svg'
import useMedia from '../../utils/useMedia'
import clsx from 'clsx'

interface FooterProps {
  showHireButton?: boolean
}

export const Email = ({isMobile}: {isMobile?: boolean}) => (
  <LinkComponent link='emailto:info@promvisio.ru' className={styles.email}>
    {isMobile && (
      <div className={styles.social}>
        <Envelope />
      </div>
    )}

    <h2>info@promvisio.ru</h2>
  </LinkComponent>
)

export const Phone = () => (
  <LinkComponent link='tel:+79039689048' className={styles.phone}>
    <div className={styles.social}>
      <PhoneSVG />
    </div>

    <h2>+7 (903) 968 9048</h2>
  </LinkComponent>
)

export const Copyright = ({isShort}: {isShort?: boolean}) => (
  <>
    <hr className={clsx(styles.line, {[styles.lineShort]: isShort})} />

    <p className={styles.copyright}>© 2023 «ПРОМВИЗИО»</p>
  </>
)

const Footer = ({showHireButton}: FooterProps) => {
  const {isDesktop, isMobile} = useMedia()

  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.info}>
        <div className={styles.socials}>
          <LinkComponent link='#' linkExternal className={styles.social}>
            <img src='/icons/dzen.svg' alt='dzen' /> {isMobile && <span>Дзен</span>}
          </LinkComponent>

          <LinkComponent link='#' linkExternal className={styles.social}>
            <img src='/icons/youtube.svg' alt='youtube' /> {isMobile && <span>YouTube</span>}
          </LinkComponent>

          {isDesktop && <Email />}
        </div>

        {isMobile && <hr className={styles.line} />}

        {isDesktop && <Copyright />}
      </div>

      <div className={styles.action}>
        <Phone />

        {isMobile && <Email isMobile />}

        {showHireButton && <HireButton />}
      </div>

      {isMobile && <Copyright isShort />}
    </footer>
  )
}

export default Footer
