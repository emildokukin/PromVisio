import {ReactNode} from 'react'
import styles from './Page.module.scss'
import Header from './Header'
import clsx from 'clsx'
import Footer from './Footer'
import HireButton from '../hire-button/HireButton'

interface PageProps {
  children: ReactNode
  className?: string
  floatingHireButton?: boolean
}

const Page = ({children, className, floatingHireButton}: PageProps) => (
  <>
    <Header />

    <main className={clsx(styles.content, className)}>{children}</main>

    {floatingHireButton && <HireButton floating />}

    <Footer showHireButton={!floatingHireButton} />
  </>
)

export default Page
