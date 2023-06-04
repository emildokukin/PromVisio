import {ChangeEvent, useCallback, useState} from 'react'
import styles from './HireButton.module.scss'
import FormModal from '../modal/FormModal'
import clsx from 'clsx'
import {Input} from '../input/Input'
import {Textarea} from '../input/Textarea'
import {getPhoneNumber} from '../../utils/getPhoneNumber'

const HireButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModalVisibility = useCallback(() => setIsModalVisible((prev) => !prev), [])

  const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    getPhoneNumber(e)
  }, [])

  return (
    <>
      <button className={clsx(styles.button, styles.floating)} onClick={toggleModalVisibility}>
        <span>Нанять нас</span> <img src='/icons/phone.svg' alt='phone' />
      </button>

      <FormModal active={isModalVisible} toggle={toggleModalVisibility} title='Нанять нас' image='/icons/logo.svg'>
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
      </FormModal>
    </>
  )
}

export default HireButton
