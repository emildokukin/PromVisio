import LinkComponent from '../link-component/LinkComponent'
import styles from './Header.module.scss'
import {useCallback, useState} from 'react'
import {ReactComponent as PhoneSVG} from '../../../icons/phone-small.svg'
import useMedia from '../../utils/useMedia'

const Links = () => (
  <nav className={styles.links}>
    <ul>
      <li>
        <LinkComponent link='#'>Галерея</LinkComponent>
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

const Header = () => {
  const [isOpened, setIsOpened] = useState(false)
  const {isDesktop} = useMedia()

  const triggerMenuState = useCallback(() => {
    if (document) {
      document.body.style.overflow = isOpened ? 'auto' : 'hidden'
    }

    setIsOpened((prev) => !prev)
  }, [isOpened])

  return (
    <header className={styles.header} id='header' onClick={triggerMenuState}>
      <img src='/icons/logo.svg' alt='logo prom visio' className={styles.logo} />

      {isDesktop && <Links />}

      {isDesktop && <Phone />}
    </header>
  )
}

export default Header
