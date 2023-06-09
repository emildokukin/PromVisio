import {TextareaHTMLAttributes} from 'react'
import styles from './Input.module.scss'
import {DefaultInputProps, Error, InputLayout} from './Default'
import clsx from 'clsx'
import {useFormContext} from 'react-hook-form'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, DefaultInputProps {}

export const Textarea = ({label, className, children, error, ...rest}: TextareaProps) => {
  const {register} = useFormContext()

  return (
    <InputLayout label={label} required={rest.required}>
      <textarea
        className={clsx(styles.default, styles.textarea, className, {[styles.defaultError]: !!error})}
        {...register(rest?.name || '')}
        {...rest}
      >
        {children}
      </textarea>

      {!!error && <Error error={error} />}
    </InputLayout>
  )
}
