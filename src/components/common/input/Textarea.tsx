import {TextareaHTMLAttributes} from 'react'
import styles from './Input.module.scss'
import {DefaultInputProps, Error, InputLayout} from './Default'
import clsx from 'clsx'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, DefaultInputProps {}

export const Textarea = ({label, className, children, error, ...rest}: TextareaProps) => (
  <InputLayout label={label} required={rest.required}>
    <textarea className={clsx(styles.default, styles.textarea, className)} {...rest}>
      {children}
    </textarea>

    {!!error && <Error error={error} />}
  </InputLayout>
)
