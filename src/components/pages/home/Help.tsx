import clsx from 'clsx'
import styles from './Help.module.scss'
import {ReactNode, useCallback, useRef, useState} from 'react'

export interface HelpItem {
  title: ReactNode
  text: string
}

interface HelpItemProps extends HelpItem {
  isToggled: boolean
  updatePointerPosition: (top: number) => void
  onClick: () => void
}

const HelpItem = ({title, text, isToggled, updatePointerPosition, onClick}: HelpItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null)

  const handleClick = useCallback(() => {
    onClick()

    const item = itemRef.current
    const parent = item?.parentElement

    if (item && parent) {
      updatePointerPosition(item?.getBoundingClientRect().top - parent?.getBoundingClientRect().top + 40)
    }
  }, [])

  return (
    <li className={styles.item} onClick={handleClick} ref={itemRef}>
      <h2>
        {title}

        <img
          className={clsx(styles.arrow, {[styles.toggled]: isToggled})}
          src='/icons/list-arrow.svg'
          alt='toggle arrow'
        />
      </h2>

      <h3
        className={clsx({[styles.toggled]: isToggled})}
        ref={(node) => {
          if (node) {
            node.style.height = node.scrollHeight + 'px'
          }
        }}
      >
        {text}
      </h3>
    </li>
  )
}

const Help = ({items}: {items: HelpItem[]}) => {
  const [pointerTop, setPointerTop] = useState(40)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  const updatePointerPosition = useCallback((top: number) => setPointerTop(top), [])

  return (
    <section className={styles.help}>
      <h1>помогаем</h1>

      <ul className={styles.items}>
        <div className={styles.pointer} style={{top: pointerTop}}></div>

        {items.map((item, index) => (
          <HelpItem
            key={index}
            {...item}
            updatePointerPosition={updatePointerPosition}
            isToggled={currentIndex === index}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </ul>
    </section>
  )
}

export default Help
