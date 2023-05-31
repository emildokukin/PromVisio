import {useMediaQuery} from 'react-responsive'

const queries = {mobile: '(max-width: 1279px)'}

const useMedia = () => {
  const isMobile = useMediaQuery({query: queries.mobile})

  return {isMobile, isDesktop: !isMobile}
}

export default useMedia
