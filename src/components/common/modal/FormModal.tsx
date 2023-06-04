import {ChangeEvent, useCallback} from 'react'
import {Input} from '../input/Input'
import {Textarea} from '../input/Textarea'
import {CloseButton} from './CloseButton'
import styles from './FormModal.module.scss'
import Modal, {ModalBasedProps} from './Modal'
import {getPhoneNumber} from '../../utils/getPhoneNumber'
import clsx from 'clsx'

interface FormModalProps extends ModalBasedProps {
  title: string
  image: string
  onSubmit?: () => void
  className?: string
}

const FormModal = ({active, toggle, title, image, onSubmit, className}: FormModalProps) => {
  const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    getPhoneNumber(e)
  }, [])

  return (
    <Modal active={active} toggle={toggle} contentClassName={clsx(styles.content, className)}>
      <div className={styles.logo}>
        <img src={image} alt='logo' />
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <h2>{title}</h2>

        <div className={styles.inputs}>
          <Input label='Тема' name='theme' type='text' required />
          <Textarea label='Текст сообщения' name='message' />
          <Input
            label='Номер телефона'
            name='phone_number'
            placeholder='+7'
            type='tel'
            required
            onChange={handlePhoneChange}
          />
          <Input label='Email' name='email' type='email' required />
        </div>

        <div className={styles.bottom}>
          <button type='submit' className={styles.button}>
            ОТПРАВИТЬ
          </button>

          <p className={styles.important}>
            Очень важные поля для заполнения <img src='/icons/asterisk.svg' alt='asterisk' />
          </p>
        </div>
      </form>

      <CloseButton onClick={toggle} />
    </Modal>
  )
}
export default FormModal
