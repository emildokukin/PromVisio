import styles from './ScrollButton.module.scss'
import clsx from 'clsx'
import useScroll from '../../utils/useScroll'
import SliderButton from '../slider/SliderButton'
import useMedia from '../../utils/useMedia'

const isLowerThanFooter = (isMobile: boolean) => {
  const footer = document.querySelector('#footer')
  const offset = isMobile ? 36 : 128
  const bottom = isMobile ? 16 : 48

  if (footer) {
    if (footer?.getBoundingClientRect().top - offset + bottom < window.innerHeight) {
      return window.innerHeight - footer.getBoundingClientRect().top + offset
    }
  }

  return bottom
}

const ScrollButton = () => {
  const {scrollPosition} = useScroll()
  const {isMobile} = useMedia()

  return (
    <div
      className={clsx(styles.button, 'scroll-button', {
        [styles.visible]: scrollPosition > window.innerHeight
      })}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      style={{bottom: isLowerThanFooter(isMobile)}}
    >
      <SliderButton className={styles.arrow} />
    </div>
  )
}

export default ScrollButton
