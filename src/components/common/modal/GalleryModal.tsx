import {useContext, useEffect} from 'react'
import {CloseButton} from './CloseButton'
import styles from './GalleryModal.module.scss'
import Modal from './Modal'
import {GalleryModalContext} from './GalleryModalContext'

const GalleryModal = () => {
  const {active, toggle} = useContext(GalleryModalContext)

  useEffect(() => {
    console.log(active)
  }, [active])

  return (
    <Modal active={active} toggle={toggle} contentClassName={styles.content}>
      <CloseButton onClick={toggle} />
    </Modal>
  )
}

export default GalleryModal
