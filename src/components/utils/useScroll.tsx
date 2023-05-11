import {useCallback, useEffect, useState} from 'react'

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrollToTop, setIsScrollToTop] = useState(false)
  const [checkPosition, setCheckPosition] = useState(false)

  const handleScroll = useCallback(() => {
    setCheckPosition((prev: boolean) => !prev)
  }, [])

  useEffect(() => {
    setIsScrollToTop(window.pageYOffset < scrollPosition)
    setScrollPosition(window.pageYOffset)
  }, [checkPosition])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {scrollPosition, isScrollToTop}
}

export default useScroll
