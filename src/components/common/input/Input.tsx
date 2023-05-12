import {InputHTMLAttributes} from 'react'
import {DefaultInputProps, Error, InputLayout} from './Default'
import clsx from 'clsx'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, DefaultInputProps {}

export const Input = ({label, className, children, error, ...rest}: InputProps) => (
  <InputLayout label={label} required={rest.required}>
    <input className={clsx(styles.default, className)} {...rest}>
      {children}
    </input>

    {!!error && <Error error={error} />}
  </InputLayout>
)
