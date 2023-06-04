import React, {ReactNode, useCallback, useState} from 'react'

interface Context {
  active: boolean
  toggle: () => void
  items: string[]
  updateItems: (items: string[]) => void
  index: number
  updateIndex: (index: number) => void
}

export const GalleryModalContext = React.createContext<Context>({} as Context)

export const GalleryModalProvider = ({children}: {children: ReactNode}) => {
  const [active, setActive] = useState<boolean>(false)
  const [items, setItems] = useState<string[]>([])
  const [index, setIndex] = useState<number>(0)

  const toggle = useCallback(() => setActive((prev) => !prev), [])
  const updateItems = useCallback((items: string[]) => setItems(items), [])
  const updateIndex = useCallback((index: number) => setIndex(index), [])

  return (
    <GalleryModalContext.Provider value={{active, toggle, items, updateItems, index, updateIndex}}>
      {children}
    </GalleryModalContext.Provider>
  )
}
