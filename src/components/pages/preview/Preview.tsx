import {useQuery} from '@tanstack/react-query'
import API from '../../utils/API'
import {ENDPOINT} from '../../utils/endpoints'
import {useContext, useEffect} from 'react'
import PreviewContext from '../../utils/preview'
import {Navigate} from 'react-router-dom'

const contentKey = 'content_type'
const tokenKey = 'token'

const Preview = () => {
  const {setPreview} = useContext(PreviewContext)
  const params = new URL(window.location.href).searchParams
  const content_type = params.get(contentKey)
  const token = params.get(tokenKey)

  const {data, isSuccess} = useQuery(['preview'], () =>
    API.GET(ENDPOINT.preview, {params: {content_type, token}}).then((res) => res.data)
  )

  useEffect(() => {
    if (isSuccess && setPreview) {
      setPreview(data)
    }
  }, [isSuccess])

  return isSuccess ? <Navigate to={new URL(data?.meta?.html_url).pathname || '/'} /> : <></>
}

export default Preview
