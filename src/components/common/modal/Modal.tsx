import clsx from 'clsx'
import {ReactNode, useEffect} from 'react'
import styles from './Modal.module.scss'

export interface ModalBasedProps {
  active: boolean
  toggle: () => void
  children: ReactNode
}

interface ModalProps extends ModalBasedProps {
  modalClassName?: string
  contentClassName?: string
}

const Modal = ({active, toggle, modalClassName, contentClassName, children}: ModalProps) => {
  useEffect(() => {
    if (document) {
      document.body.style.overflow = active ? 'hidden' : 'auto'
    }
  }, [active])

  return (
    <div className={clsx(styles.modal, modalClassName, {[styles.modalActive]: active})} onClick={toggle}>
      <div
        className={clsx(styles.content, contentClassName, {[styles.contentActive]: active})}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
