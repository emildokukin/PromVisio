import clsx from 'clsx'
import {ReactComponent as Cross} from '../../../icons/cross.svg'
import styles from './CloseButton.module.scss'

interface CloseButtonProps {
  onClick: () => void
  className?: string
}

export const CloseButton = ({onClick, className}: CloseButtonProps) => (
  <div className={clsx(styles.cross, className)} onClick={onClick}>
    <Cross />
  </div>
)
