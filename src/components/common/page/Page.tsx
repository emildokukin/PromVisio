import {ReactNode} from 'react'
import styles from './Page.module.scss'
import Header from './Header'
import clsx from 'clsx'
import Footer from './Footer'

interface PageProps {
  children: ReactNode
  className?: string
}

const Page = ({children, className}: PageProps) => (
  <>
    <Header />

    <main className={clsx(styles.content, className)}>{children}</main>

    <Footer />
  </>
)

export default Page
