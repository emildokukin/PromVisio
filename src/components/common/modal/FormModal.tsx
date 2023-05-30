import clsx from 'clsx'
import {ReactNode, useEffect} from 'react'
import styles from './FormModal.module.scss'
import {ReactComponent as Cross} from '../../../icons/cross.svg'

interface ModalProps {
  active: boolean
  toggle: () => void
  children: ReactNode
  title: string
  image: string
  onSubmit?: () => void
}

const Modal = ({active, toggle, children, title, image, onSubmit}: ModalProps) => {
  useEffect(() => {
    if (document) {
      document.body.style.overflow = active ? 'hidden' : 'auto'
    }
  }, [active])

  return (
    <div className={clsx(styles.modal, {[styles.modalActive]: active})} onClick={toggle}>
      <div className={clsx(styles.content, {[styles.contentActive]: active})} onClick={(e) => e.stopPropagation()}>
        <div className={styles.logo}>
          <img src={image} alt='logo' />
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <h2>{title}</h2>

          <div className={styles.inputs}>{children}</div>

          <div className={styles.bottom}>
            <button type='submit' className={styles.button}>
              ОТПРАВИТЬ
            </button>

            <p className={styles.important}>
              Очень важные поля для заполнения <img src='/icons/asterisk.svg' alt='asterisk' />
            </p>
          </div>
        </form>

        <div className={styles.cross} onClick={toggle}>
          <Cross />
        </div>
      </div>
    </div>
  )
}

export default Modal
