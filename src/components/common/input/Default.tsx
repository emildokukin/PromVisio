import {ReactNode} from 'react'
import styles from './Input.module.scss'

export const Error = ({error}: {error?: string}) => <p className={styles.error}>{error}</p>

export interface DefaultInputProps {
  label?: string
  className?: string
  children?: ReactNode
  error?: string
}

export const InputLayout = (props: {
  children: ReactNode
  label: string | undefined
  required?: boolean | undefined
}) => (
  <label className={styles.wrapper}>
    {props.label ? (
      <p className={styles.label}>
        <span>{props.label}</span> {props.required && <img src='/icons/asterisk.svg' alt='asterisk' />}
      </p>
    ) : null}

    {props.children}
  </label>
)
