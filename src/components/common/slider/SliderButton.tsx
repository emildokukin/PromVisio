import clsx from 'clsx'
import styles from './SliderButton.module.scss'
import {ReactComponent as SliderArrow} from '../../../icons/slider-arrow.svg'

interface SliderButtonProps {
  onClick?: () => void
  next?: boolean
  disabled?: boolean
  className?: string
}

const SliderButton = ({onClick, next = false, disabled = false, className}: SliderButtonProps) => (
  <button
    className={clsx(styles.arrow, {[styles.prev]: !next, [styles.next]: next, [styles.disabled]: disabled}, className)}
    onClick={() => (!disabled ? onClick?.() : null)}
  >
    <SliderArrow />
  </button>
)

export default SliderButton
