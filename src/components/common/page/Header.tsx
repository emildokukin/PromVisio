import styles from './Header.module.scss'
import {useCallback, useState} from 'react'

const Header = () => {
  const [isOpened, setIsOpened] = useState(false)

  const triggerMenuState = useCallback(() => {
    if (document) {
      document.body.style.overflow = isOpened ? 'auto' : 'hidden'
    }

    setIsOpened((prev) => !prev)
  }, [isOpened])

  return <header className={styles.header} id='header' onClick={triggerMenuState}></header>
}

export default Header
