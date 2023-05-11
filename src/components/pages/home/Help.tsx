import clsx from 'clsx'
import styles from './Help.module.scss'
import {ReactNode, useCallback, useState} from 'react'

export interface HelpItem {
  title: ReactNode
  text: string
}

const HelpItem = ({title, text}: HelpItem) => {
  const [isToggled, setIsToggled] = useState(false)

  const handleClick = useCallback(() => {
    setIsToggled((prev) => !prev)
  }, [])

  return (
    <li className={styles.item} onClick={handleClick}>
      <h2>
        {title}

        <img
          className={clsx(styles.arrow, {[styles.toggled]: isToggled})}
          src='/icons/list-arrow.svg'
          alt='toggle arrow'
        />
      </h2>

      <h3 className={clsx({[styles.toggled]: isToggled})}>{text}</h3>
    </li>
  )
}

const Help = ({items}: {items: HelpItem[]}) => {
  return (
    <section className={styles.help}>
      <h1>помогаем</h1>

      <ul className={styles.items}>
        {items.map((item, index) => (
          <HelpItem key={index} {...item} />
        ))}
      </ul>
    </section>
  )
}

export default Help
