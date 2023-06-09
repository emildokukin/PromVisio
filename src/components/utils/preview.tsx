import React, {ReactNode, useState} from 'react'
import {Preview} from '../pages/preview/types'

interface Context {
  preview: Preview | undefined
  setPreview: ((preview: Preview) => Promise<unknown>) | undefined
}

export const PreviewContext = React.createContext<Context>({
  preview: undefined,
  setPreview: undefined
})

export const PreviewProvider = ({children}: {children: ReactNode}) => {
  const [preview, updatePreview] = useState<Preview | undefined>(undefined)

  const setPreview = async (preview: Preview) =>
    new Promise((resolve) => {
      updatePreview(preview)

      resolve(true)
    })

  return <PreviewContext.Provider value={{preview, setPreview}}>{children}</PreviewContext.Provider>
}

export default PreviewContext
