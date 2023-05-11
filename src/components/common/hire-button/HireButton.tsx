import styles from './HireButton.module.scss'

const HireButton = () => (
  <button className={styles.button}>
    <span>Нанять нас</span> <img src='/icons/phone.svg' alt='phone' />
  </button>
)

export default HireButton
