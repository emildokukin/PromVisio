import LinkComponent from '../link-component/LinkComponent'
import styles from './Footer.module.scss'
import {ReactComponent as PhoneSVG} from '../../../icons/phone-small.svg'
import {ReactComponent as EnvelopeSVG} from '../../../icons/envelope.svg'
import {ReactComponent as DzenSVG} from '../../../icons/dzen.svg'
import {ReactComponent as RutubeSVG} from '../../../icons/rutube.svg'
import useMedia from '../../utils/useMedia'
import clsx from 'clsx'

export const Email = ({isMobile, border}: {isMobile?: boolean; border?: boolean}) => (
  <LinkComponent link='emailto:info@promvisio.ru' className={styles.emailWrapper}>
    {isMobile && (
      <div className={clsx(styles.email, {[styles.border]: border})}>
        <EnvelopeSVG />
      </div>
    )}

    <h2>info@promvisio.ru</h2>
  </LinkComponent>
)

export const Phone = ({
  borderGray,
  borderYellow,
  className
}: {
  borderGray?: boolean
  borderYellow?: boolean
  className?: string
}) => (
  <LinkComponent link='tel:+79039689048' className={clsx(styles.phoneWrapper, className)}>
    <div className={clsx(styles.phone, {[styles.social]: borderGray, [styles.border]: borderYellow})}>
      <PhoneSVG />
    </div>

    <h2>+7 (903) 968_90_48</h2>
  </LinkComponent>
)

export const Copyright = ({isShort}: {isShort?: boolean}) => (
  <>
    <hr className={clsx(styles.line, {[styles.lineShort]: isShort})} />

    <p className={styles.copyright}>© {new Date().getFullYear()} «ПРОМВИЗИО»</p>
  </>
)

const Footer = () => {
  const {isDesktop, isMobile} = useMedia()

  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.info}>
        <div className={styles.socials}>
          <LinkComponent link='https://dzen.ru/promvisio' linkExternal className={styles.social}>
            <DzenSVG /> {isMobile && <span>Дзен</span>}
          </LinkComponent>

          <LinkComponent link='https://rutube.ru/channel/31324384/' linkExternal className={styles.social}>
            <RutubeSVG /> {isMobile && <span>RUTUBE</span>}
          </LinkComponent>

          {isDesktop && <Email />}
        </div>

        {isMobile && <hr className={styles.line} />}

        {isDesktop && <Copyright />}
      </div>

      <div className={styles.action}>
        <Phone borderGray={isDesktop} borderYellow={isMobile} />

        {isMobile && <Email isMobile border={isMobile} />}
      </div>

      {isMobile && <Copyright isShort />}
    </footer>
  )
}

export default Footer
