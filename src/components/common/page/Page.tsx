import {ReactNode} from 'react'
import styles from './Page.module.scss'
import clsx from 'clsx'
import Footer from './Footer'
import HireButton from '../hire-button/HireButton'
import Cookies from '../cookie/Cookies'
import ScrollButton from '../scroll-button/ScrollButton'
import GalleryModal from '../modal/GalleryModal'

interface PageProps {
  children: ReactNode
  className?: string
  scrollButton?: boolean
}

const Page = ({children, className, scrollButton}: PageProps) => (
  <>
    <main className={clsx(styles.content, className)}>{children}</main>

    {scrollButton && <ScrollButton />}

    <HireButton />

    <GalleryModal />

    <Cookies />

    <Footer />
  </>
)

export default Page
