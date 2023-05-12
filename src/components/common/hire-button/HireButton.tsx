import {ChangeEvent, useCallback, useState} from 'react'
import styles from './HireButton.module.scss'
import Modal from '../modal/Modal'
import clsx from 'clsx'
import {Input} from '../input/Input'
import {Textarea} from '../input/Textarea'
import {getPhoneNumber} from '../../utils/getPhoneNumber'

interface HireButtonProps {
  floating?: boolean
}

const HireButton = ({floating}: HireButtonProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModalVisibility = useCallback(() => setIsModalVisible((prev) => !prev), [])

  const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    getPhoneNumber(e)
  }, [])

  return (
    <>
      <button className={clsx(styles.button, {[styles.floating]: floating})} onClick={toggleModalVisibility}>
        <span>Нанять нас</span> <img src='/icons/phone.svg' alt='phone' />
      </button>

      <Modal active={isModalVisible} toggle={toggleModalVisibility} title='Нанять нас' image='/icons/logo.svg'>
        <Input label='Тема' name='theme' required />
        <Textarea label='Текст сообщения' name='message' />
        <Input label='Номер телефона' name='phone_number' placeholder='+7' required onChange={handlePhoneChange} />
        <Input label='Email' name='email' required />
      </Modal>
    </>
  )
}

export default HireButton
