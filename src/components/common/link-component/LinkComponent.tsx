import {ReactNode} from 'react'
import {Link} from 'react-router-dom'

interface LinkComponentProps {
  link: string
  linkExternal: string
  children: ReactNode
}

const LinkComponent = ({link, linkExternal, children}: LinkComponentProps) => {
  if (link && linkExternal) {
    return (
      <a href={link} target='_blank' rel='noreferrer'>
        {children}
      </a>
    )
  } else if (link) {
    return <Link to={link}>{children}</Link>
  }

  return <>{children}</>
}

export default LinkComponent
