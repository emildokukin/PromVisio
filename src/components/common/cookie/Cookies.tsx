import {useEffect, useState} from 'react'
import cookies from 'js-cookie'
import styles from './Cookies.module.scss'
import clsx from 'clsx'

const cookiesName = 'cookies'

const Cookies = () => {
  const [cookieState, setCookieState] = useState(true)

  useEffect(() => setCookieState(!!cookies.get(cookiesName)), [])

  return (
    <div className={clsx(styles.cookiesWrapper, {[styles.visible]: !cookieState})}>
      <div className={styles.cookies}>
        <h3 className={styles.text}>
          Куки. Натуралистическая парадигма, согласно
          <br /> традиционным представлениям, предсказуема.
        </h3>

        <button
          className={styles.button}
          onClick={() => {
            cookies.set(cookiesName, 'true')

            setCookieState(true)
          }}
        >
          ОК
        </button>
      </div>
    </div>
  )
}

export default Cookies
