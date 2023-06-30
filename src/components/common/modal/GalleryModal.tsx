import {useCallback, useContext, useEffect, useRef} from 'react'
import {CloseButton} from './CloseButton'
import styles from './GalleryModal.module.scss'
import Modal from './Modal'
import {GalleryModalContext} from './GalleryModalContext'
import {ReactComponent as GalleryArrow} from '../../../icons/gallery-arrow.svg'
import clsx from 'clsx'
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react'
import {Swiper as SwiperType, EffectFade} from 'swiper'
import useMedia from '../../utils/useMedia'

const GalleryModal = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const {isMobile} = useMedia()
  const {active, items, index, updateIndex, toggle} = useContext(GalleryModalContext)

  const toPrevSlide = useCallback(() => updateIndex(Math.max(index - 1, 0)), [index])
  const toNextSlide = useCallback(() => updateIndex(Math.min(index + 1, items.length - 1)), [index, items.length])
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!active) return

      switch (e.code) {
        case 'Escape':
          toggle()
          break
        case 'ArrowLeft':
          toPrevSlide()
          break
        case 'ArrowRight':
          toNextSlide()
          break
      }
    },
    [active, toPrevSlide, toNextSlide]
  )

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(index)
  }, [index])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <Modal active={active} toggle={toggle} modalClassName={styles.modal} contentClassName={styles.content}>
      <Swiper
        className={styles.swiper}
        ref={swiperRef}
        effect={isMobile ? 'slide' : 'fade'}
        modules={[EffectFade]}
        initialSlide={index}
        onSlideChange={(swiper: SwiperType) => updateIndex(swiper.activeIndex)}
        spaceBetween={isMobile ? 80 : 0}
        allowTouchMove={isMobile}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {item.includes('<iframe') ? (
              <div dangerouslySetInnerHTML={{__html: item}}></div>
            ) : (
              <img src={item} alt='gallery image or video' />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={clsx(styles.arrow, {[styles.disabled]: index === 0})} onClick={toPrevSlide}>
        <GalleryArrow />
      </div>

      <div
        className={clsx(styles.arrow, styles.arrowNext, {[styles.disabled]: index + 1 >= items.length})}
        onClick={toNextSlide}
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
