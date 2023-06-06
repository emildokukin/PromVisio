import {useContext} from 'react'
import styles from './HireButton.module.scss'
import FormModal from '../modal/FormModal'
import clsx from 'clsx'
import {HireFormModalContext} from '../modal/FormModalContext'

const HireButton = () => {
  const {active, toggle} = useContext(HireFormModalContext)

  return (
    <>
      <button className={clsx(styles.button, styles.floating, 'floating')} onClick={toggle}>
        <span>Нанять нас</span> <img src='/icons/phone.svg' alt='phone' />
      </button>

      <FormModal active={active} toggle={toggle} title='Нанять нас' image='/icons/logo.svg' />
    </>
  )
}

export default HireButton
