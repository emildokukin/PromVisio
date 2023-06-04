import {ReactComponent as Cross} from '../../../icons/cross.svg'
import styles from './CloseButton.module.scss'

interface CloseButtonProps {
  onClick: () => void
}

export const CloseButton = ({onClick}: CloseButtonProps) => (
  <div className={styles.cross} onClick={onClick}>
    <Cross />
  </div>
)
