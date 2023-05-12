import clsx from 'clsx'
import {ReactNode} from 'react'
import styles from './Modal.module.scss'
import {ReactComponent as Cross} from '../../../icons/cross.svg'

interface ModalProps {
  active: boolean
  toggle: () => void
  children: ReactNode
  title: string
  image: string
  onSubmit?: () => void
}

const Modal = ({active, toggle, children, title, image, onSubmit}: ModalProps) => (
  <div className={clsx(styles.modal, {[styles.modalActive]: active})} onClick={toggle}>
    <div className={clsx(styles.content, {[styles.contentActive]: active})} onClick={(e) => e.stopPropagation()}>
      <div className={styles.logo}>
        <img src={image} alt='logo' />
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <h2>{title}</h2>

        <div className={styles.inputs}>{children}</div>

        <p className={styles.important}>
          Очень важные поля для заполнения <img src='/icons/asterisk.svg' alt='asterisk' />
        </p>

        <button type='submit' className={styles.button}>
          ОТПРАВИТЬ
        </button>
      </form>

      <div className={styles.cross} onClick={toggle}>
        <Cross />
      </div>
    </div>
  </div>
)

export default Modal
