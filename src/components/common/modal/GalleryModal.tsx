import {useCallback, useContext, useRef, useState} from 'react'
import {CloseButton} from './CloseButton'
import styles from './GalleryModal.module.scss'
import Modal from './Modal'
import {GalleryModalContext} from './GalleryModalContext'
import {ReactComponent as GalleryArrow} from '../../../icons/gallery-arrow.svg'
import clsx from 'clsx'
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react'
import {Swiper as SwiperType, EffectFade} from 'swiper'

const GalleryModal = () => {
  const {active, items, index, updateIndex, toggle} = useContext(GalleryModalContext)

  const swiperRef = useRef<SwiperRef>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const onSlideChange = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
    updateIndex(swiper.activeIndex)
  }, [])

  return (
    <Modal active={active} toggle={toggle} contentClassName={styles.content}>
      <Swiper
        className={styles.swiper}
        ref={swiperRef}
        effect={'fade'}
        modules={[EffectFade]}
        allowTouchMove={false}
        onSlideChange={onSlideChange}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt='gallery image or video' />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={clsx(styles.arrow, {[styles.disabled]: isBeginning})}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
      >
        <GalleryArrow />
      </div>

      <div
        className={clsx(styles.arrow, styles.arrowNext, {[styles.disabled]: isEnd})}
        onClick={() => swiperRef.current?.swiper.slideNext()}
      >
        <GalleryArrow />
      </div>

      <div className={styles.index}>
        {index + 1} <span>/</span> {items.length}
      </div>

      <CloseButton onClick={toggle} className={styles.close} />
    </Modal>
  )
}

export default GalleryModal
