import LinkComponent from '../link-component/LinkComponent'
import styles from './Header.module.scss'
import {useCallback, useState} from 'react'
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
        <LinkComponent link='/news'>Вестник</LinkComponent>
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

const Menu = ({isVisible}: {isVisible?: boolean}) => (
  <div className={clsx(styles.menu, {[styles.visible]: isVisible})}>
    <Links />

    <div className={styles.bottom}>
      <FooterPhone borderYellow />
      <FooterEmail isMobile border />
      <FooterCopyright />
    </div>
  </div>
)

const Hamburger = ({isTriggered, onClick}: {isTriggered: boolean; onClick: () => void}) => (
  <div className={clsx(styles.hamburger, {[styles.cross]: isTriggered})} onClick={onClick}></div>
)

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

        {isDesktop && <FooterPhone borderYellow className={styles.phone} />}

        {isMobile && <Hamburger isTriggered={isOpened} onClick={triggerMenuState} />}
      </header>

      <Menu isVisible={isOpened} />
    </>
  )
}

export default Header
