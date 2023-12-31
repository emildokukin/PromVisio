import {InputHTMLAttributes} from 'react'
import {DefaultInputProps, Error, InputLayout} from './Default'
import clsx from 'clsx'
import styles from './Input.module.scss'
import {useFormContext} from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, DefaultInputProps {}

export const Input = ({label, className, children, error, ...rest}: InputProps) => {
  const {register} = useFormContext()

  return (
    <InputLayout label={label} required={rest.required}>
      <input
        className={clsx(styles.default, className, {[styles.defaultError]: !!error})}
        {...register(rest?.name || '')}
        {...rest}
      >
        {children}
      </input>

      {!!error && <Error error={error} />}
    </InputLayout>
  )
}
