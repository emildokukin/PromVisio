import {useCallback, useState} from 'react'
import styles from './HireButton.module.scss'
import FormModal from '../modal/FormModal'
import clsx from 'clsx'

const HireButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModalVisibility = useCallback(() => setIsModalVisible((prev) => !prev), [])

  return (
    <>
      <button className={clsx(styles.button, styles.floating)} onClick={toggleModalVisibility}>
        <span>Нанять нас</span> <img src='/icons/phone.svg' alt='phone' />
      </button>

      <FormModal active={isModalVisible} toggle={toggleModalVisibility} title='Нанять нас' image='/icons/logo.svg' />
    </>
  )
}

export default HireButton
