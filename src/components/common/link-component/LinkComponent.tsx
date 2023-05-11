import clsx from 'clsx'
import {ReactNode} from 'react'
import {Link} from 'react-router-dom'

interface LinkComponentProps {
  link?: string
  linkExternal?: boolean
  children: ReactNode
  className?: string
}

const LinkComponent = ({link, linkExternal, children, className}: LinkComponentProps) => {
  if (link && linkExternal) {
    return (
      <a href={link} target='_blank' rel='noreferrer' className={clsx(className)}>
        {children}
      </a>
    )
  } else if (link) {
    return (
      <Link to={link} className={clsx(className)}>
        {children}
      </Link>
    )
  }

  return <>{children}</>
}

export default LinkComponent
