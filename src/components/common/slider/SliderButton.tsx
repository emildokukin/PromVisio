import clsx from 'clsx'
import styles from './SliderButton.module.scss'
import {ReactComponent as SliderArrow} from '../../../icons/slider-arrow.svg'

interface SliderButtonProps {
  onClick: () => void
  next?: boolean
  className?: string
}

const SliderButton = ({onClick, next = false, className}: SliderButtonProps) => (
  <button className={clsx({[styles.prev]: !next, [styles.next]: next}, className)} onClick={onClick}>
    <SliderArrow />
  </button>
)

export default SliderButton
