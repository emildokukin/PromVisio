import LinkComponent from '../link-component/LinkComponent'
import styles from './Header.module.scss'
import {useCallback, useEffect, useState} from 'react'
import useMedia from '../../utils/useMedia'
import clsx from 'clsx'
import {Copyright as FooterCopyright, Email as FooterEmail, Phone as FooterPhone} from './Footer'
import {useLocation} from 'react-router-dom'

const Links = ({location}: {location?: string}) => (
  <nav className={styles.links}>
    <ul>
      <li className={clsx({[styles.current]: location === '/gallery'})}>
        <LinkComponent link='/gallery'>Галерея</LinkComponent>
      </li>
      <li className={clsx({[styles.current]: location === '/news'})}>
        <LinkComponent link='/news'>Вестник</LinkComponent>
      </li>
      <li className={clsx({[styles.current]: location === '/project'})}>
        <LinkComponent link='/project'>История одного проекта</LinkComponent>
      </li>
      <li className={clsx(styles.border, {[styles.current]: location === '/potential'})}>
        <LinkComponent link='/potential'>Потенциал ПРО</LinkComponent>
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
  const location = useLocation().pathname

  const triggerMenuState = useCallback(() => {
    if (document) {
      document.body.style.overflow = isOpened ? 'auto' : 'hidden'
    }

    setIsOpened((prev) => !prev)
  }, [isOpened])

  useEffect(() => setIsOpened(false), [location])

  return (
    <>
      <header className={styles.header} id='header'>
        <LinkComponent link='/'>
          <img src='/icons/logo.svg' alt='logo prom visio' className={styles.logo} />
        </LinkComponent>

        {isDesktop && <Links location={location} />}

        {isDesktop && <FooterPhone borderYellow className={styles.phone} />}

        {isMobile && <Hamburger isTriggered={isOpened} onClick={triggerMenuState} />}
      </header>

      <Menu isVisible={isOpened} />
    </>
  )
}

export default Header
