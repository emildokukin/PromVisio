import {ReactNode} from 'react'
import styles from './Page.module.scss'
import Header from './Header'
import clsx from 'clsx'
import Footer from './Footer'
import HireButton from '../hire-button/HireButton'
import Cookies from '../cookie/Cookies'

interface PageProps {
  children: ReactNode
  className?: string
}

const Page = ({children, className}: PageProps) => (
  <>
    <Header />

    <main className={clsx(styles.content, className)}>{children}</main>

    <HireButton />

    <Cookies />

    <Footer />
  </>
)

export default Page
