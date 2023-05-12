import {ChangeEvent} from 'react'

export const getPhoneNumber = (event: ChangeEvent<HTMLInputElement> | Event) => {
  const target = event.target as HTMLInputElement

  if (target) {
    const value = target.value
    let updatedValue = value

    if (value.slice(0, 2) !== '+7') {
      updatedValue = '+7'
    } else if (!/\d/.test(value.slice(-1)) && value.length > 2) {
      updatedValue = value.slice(0, -1)
    }

    if (updatedValue.length > 12) {
      updatedValue = value.slice(0, 12)
    }

    ;(event.target as HTMLInputElement).value = updatedValue
  }
}
