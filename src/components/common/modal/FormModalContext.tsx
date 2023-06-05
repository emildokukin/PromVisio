import React, {ReactNode, useCallback, useState} from 'react'

interface Context {
  active: boolean
  toggle: () => void
}

export const HireFormModalContext = React.createContext<Context>({} as Context)

export const HireFormModalProvider = ({children}: {children: ReactNode}) => {
  const [active, setActive] = useState<boolean>(false)

  const toggle = useCallback(() => setActive((prev) => !prev), [])

  return <HireFormModalContext.Provider value={{active, toggle}}>{children}</HireFormModalContext.Provider>
}
