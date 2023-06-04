import styles from './FormModal.module.scss'
import {ReactComponent as Cross} from '../../../icons/cross.svg'
import Modal, {ModalBasedProps} from './Modal'

interface FormModalProps extends ModalBasedProps {
  title: string
  image: string
  onSubmit?: () => void
}

const FormModal = ({active, toggle, children, title, image, onSubmit}: FormModalProps) => (
  <Modal active={active} toggle={toggle} contentClassName={styles.content}>
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
  </Modal>
)

export default FormModal
