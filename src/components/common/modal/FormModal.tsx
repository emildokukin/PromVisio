import {ChangeEvent, useCallback, useState} from 'react'
import {Input} from '../input/Input'
import {Textarea} from '../input/Textarea'
import {CloseButton} from './CloseButton'
import styles from './FormModal.module.scss'
import Modal, {ModalBasedProps} from './Modal'
import {getPhoneNumber} from '../../utils/getPhoneNumber'
import clsx from 'clsx'
import {useMutation} from '@tanstack/react-query'
import {FormProvider, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {FormSchema, formSchema} from './schema'
import {ENDPOINT} from '../../utils/endpoints'
import API from '../../utils/API'

interface FormModalProps extends ModalBasedProps {
  title: string
  image: string
  onSubmit?: () => void
  className?: string
}

interface FormProps {
  title: string
}

const Form = ({title}: FormProps) => {
  const [serverErrors, setServerErrors] = useState<{
    [key in keyof FormSchema]?: string | string[]
  }>({})

  const methods = useForm<FormSchema>({resolver: yupResolver(formSchema)})

  const {
    handleSubmit,
    formState: {errors},
    reset
  } = methods

  const {mutate, isLoading} = useMutation(
    (data: FormSchema) => API.POST(ENDPOINT.feedback, data).then((res) => res.data),
    {
      onSuccess: () => {
        setServerErrors({})
        alert('Ваши данные были успешно отправлены, мы свяжемся с Вами в ближайшее время!')
        reset()
      },
      onError: ({response}: {response: {data: FormSchema}}) => {
        setServerErrors({...response.data})
      }
    }
  )

  const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    getPhoneNumber(e)
  }, [])

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit((data: FormSchema) => mutate({...data}))}>
        <h2>{title}</h2>

        <div className={styles.inputs}>
          <Input
            label='Тема'
            type='text'
            name='subject'
            required
            error={errors.subject?.message || serverErrors?.subject}
          />
          <Textarea label='Текст сообщения' name='message' error={errors.message?.message || serverErrors?.message} />
          <Input
            label='Номер телефона'
            name='phone_number'
            placeholder='+7'
            type='tel'
            required
            onChange={handlePhoneChange}
            error={errors.phone_number?.message || serverErrors?.phone_number}
          />
          <Input label='Email' type='text' name='email' required error={errors.email?.message || serverErrors?.email} />
        </div>

        <div className={styles.bottom}>
          <button type='submit' className={styles.button} disabled={isLoading}>
            ОТПРАВИТЬ
          </button>

          <p className={styles.important}>
            Очень важные поля для заполнения <img src='/icons/asterisk.svg' alt='asterisk' />
          </p>
        </div>
      </form>
    </FormProvider>
  )
}

const FormModal = ({active, toggle, title, image, className}: FormModalProps) => {
  return (
    <Modal active={active} toggle={toggle} contentClassName={clsx(styles.content, className)}>
      <div className={styles.logo}>
        <img src={image} alt='logo' />
      </div>

      <Form title={title} />

      <CloseButton onClick={toggle} />
    </Modal>
  )
}
export default FormModal
