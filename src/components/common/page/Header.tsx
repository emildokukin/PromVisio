import LinkComponent from '../link-component/LinkComponent'
import styles from './Header.module.scss'
import {useCallback, useState} from 'react'
import {ReactComponent as PhoneSVG} from '../../../icons/phone-small.svg'
import {ReactComponent as HamburgerSVG} from '../../../icons/hamburger.svg'
import {ReactComponent as CrossSVG} from '../../../icons/cross.svg'
import useMedia from '../../utils/useMedia'
import clsx from 'clsx'
import {Copyright as FooterCopyright, Email as FooterEmail, Phone as FooterPhone} from './Footer'

const Links = () => (
  <nav className={styles.links}>
    <ul>
      <li>
        <LinkComponent link='/gallery'>Галерея</LinkComponent>
      </li>
      <li>
        <LinkComponent link='#'>Вестник</LinkComponent>
      </li>
      <li>
        <LinkComponent link='#'>История одного проекта</LinkComponent>
      </li>
      <li className={styles.border}>
        <LinkComponent link='#'>Потенциал ПРО</LinkComponent>
      </li>
    </ul>
  </nav>
)

const Phone = () => (
  <LinkComponent link='tel:+79039689048' className={styles.phone}>
    <div className={styles.social}>
      <PhoneSVG />
    </div>

    <p>+7 (903) 968_90–48</p>
  </LinkComponent>
)

const Menu = ({isVisible}: {isVisible?: boolean}) => (
  <div className={clsx(styles.menu, {[styles.visible]: isVisible})}>
    <Links />

    <div className={styles.bottom}>
      <FooterPhone />
      <FooterEmail isMobile />
      <FooterCopyright />
    </div>
  </div>
)

const Hamburger = (props: {isTriggered: boolean; onClick: () => void}) => {
  return props.isTriggered ? (
    <CrossSVG className={styles.cross} onClick={props.onClick} />
  ) : (
    <HamburgerSVG className={styles.hamburger} onClick={props.onClick} />
  )
}

const Header = () => {
  const [isOpened, setIsOpened] = useState(false)
  const {isDesktop, isMobile} = useMedia()

  const triggerMenuState = useCallback(() => {
    if (document) {
      document.body.style.overflow = isOpened ? 'auto' : 'hidden'
    }

    setIsOpened((prev) => !prev)
  }, [isOpened])

  return (
    <>
      <header className={styles.header} id='header'>
        <LinkComponent link='/'>
          <img src='/icons/logo.svg' alt='logo prom visio' className={styles.logo} />
        </LinkComponent>

        {isDesktop && <Links />}

        {isDesktop && <Phone />}

        {isMobile && <Hamburger isTriggered={isOpened} onClick={triggerMenuState} />}
      </header>

      <Menu isVisible={isOpened} />
    </>
  )
}

export default Header
