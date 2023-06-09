import {useEffect, useState} from 'react'
import API from './API'

const useParsedData = <Data>(
  data: Array<unknown> | undefined,
  preview: Array<unknown> | undefined,
  types: string[],
  getBareObject?: boolean
) => {
  const [parsedData, setParsedData] = useState<Data>()

  useEffect(() => {
    if (data || preview) {
      setParsedData({
        ...API.getObjectsByTypes(preview ? preview : data, [...types], getBareObject)
      } as Data)
    }
  }, [data, preview])

  return {parsedData}
}

export default useParsedData
