import LinkComponent from '../link-component/LinkComponent'
import styles from './Footer.module.scss'
import {ReactComponent as PhoneSVG} from '../../../icons/phone-small.svg'
import {ReactComponent as EnvelopeSVG} from '../../../icons/envelope.svg'
import {ReactComponent as DzenSVG} from '../../../icons/dzen.svg'
import {ReactComponent as YoutubeSVG} from '../../../icons/youtube.svg'
import useMedia from '../../utils/useMedia'
import clsx from 'clsx'

export const Email = ({isMobile}: {isMobile?: boolean}) => (
  <LinkComponent link='emailto:info@promvisio.ru' className={styles.emailWrapper}>
    {isMobile && (
      <div className={styles.email}>
        <EnvelopeSVG />
      </div>
    )}

    <h2>info@promvisio.ru</h2>
  </LinkComponent>
)

export const Phone = ({isDesktop}: {isDesktop?: boolean}) => (
  <LinkComponent link='tel:+79039689048' className={styles.phoneWrapper}>
    <div className={clsx(styles.phone, {[styles.social]: isDesktop})}>
      <PhoneSVG />
    </div>

    <h2>+7 (903) 968_90_48</h2>
  </LinkComponent>
)

export const Copyright = ({isShort}: {isShort?: boolean}) => (
  <>
    <hr className={clsx(styles.line, {[styles.lineShort]: isShort})} />

    <p className={styles.copyright}>© 2023 «ПРОМВИЗИО»</p>
  </>
)

const Footer = () => {
  const {isDesktop, isMobile} = useMedia()

  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.info}>
        <div className={styles.socials}>
          <LinkComponent link='#' linkExternal className={styles.social}>
            <DzenSVG /> {isMobile && <span>Дзен</span>}
          </LinkComponent>

          <LinkComponent link='#' linkExternal className={styles.social}>
            <YoutubeSVG /> {isMobile && <span>YouTube</span>}
          </LinkComponent>

          {isDesktop && <Email />}
        </div>

        {isMobile && <hr className={styles.line} />}

        {isDesktop && <Copyright />}
      </div>

      <div className={styles.action}>
        <Phone isDesktop={isDesktop} />

        {isMobile && <Email isMobile />}
      </div>

      {isMobile && <Copyright isShort />}
    </footer>
  )
}

export default Footer
