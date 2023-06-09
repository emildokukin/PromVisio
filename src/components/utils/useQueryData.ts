import {UseQueryResult, useQuery} from '@tanstack/react-query'
import {ENDPOINT} from './endpoints'
import API from './API'

const useQueryFindData = <Response>(key: string[], params: URLSearchParams = API.getURLParams()) => {
  const data: UseQueryResult<Response> = useQuery(key, () =>
    API.GET(ENDPOINT.find, {params: params}).then((res) => res.data)
  )

  return data
}

export {useQueryFindData}
