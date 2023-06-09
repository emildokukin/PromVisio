import {object, string} from 'yup'

export const phoneRegExp = /^(\+7)\d{10}$/

export const formSchema = object({
  subject: string().required('Данное поле необходимо заполнить'),
  message: string(),
  phone_number: string()
    .matches(phoneRegExp, 'Введён некорректный номер телефона')
    .required('Данное поле необходимо заполнить'),
  email: string().required('Данное поле необходимо заполнить')
})

export interface FormSchema {
  subject: string
  message: string
  phone_number: string
  email: string
}
