// https://github.com/ncoughlin/scroll-to-hash-element
// we need it so it works with React v6
// but I've updated it to make it work with typescript & made it asynchronous so it won't return null

import {useMemo, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

const ScrollToHashElement = () => {
  const location = useLocation()

  const hashElement = useMemo(async () => {
    const hash = location.hash

    const removeHashCharacter = (str: string) => {
      const result = str.slice(1)

      return result
    }

    const element = await new Promise<HTMLElement | null>((resolve) => {
      setTimeout(() => {
        resolve(document.getElementById(removeHashCharacter(hash)))
      }, 100)
    })

    return element
  }, [location])

  useEffect(() => {
    async function scrollToElement() {
      ;(await hashElement)?.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest'
      })
    }

    scrollToElement()
  }, [hashElement])

  return null
}

export default ScrollToHashElement
