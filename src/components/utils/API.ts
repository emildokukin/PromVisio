import {QueryClient} from '@tanstack/react-query'
import axios from 'axios'

const ORIGIN = process.env.NODE_ENV === 'development' ? 'https://promvisio.ru/' : window.location.origin

const DEFAULT_OPTIONS = {}

class API {
  HOST: string

  constructor() {
    this.HOST = `${ORIGIN}/api/`
  }

  public getURLParams(url?: string | null) {
    const pathname = url ? new URL(url).pathname : window.location.pathname

    return new URLSearchParams([['html_path', decodeURIComponent(pathname)]])
  }

  public getObjectByType(data: unknown, objectType: string): {type: string; value?: unknown} {
    return (data as Array<{type: string}>)?.find((block) => block.type === objectType) || {type: 'error'}
  }

  // We use this if we sure there's no repetitive keys in data object
  public getObjectsByTypes(data: unknown, objectTypes: string[], getBareObject = false) {
    return objectTypes.reduce(
      (obj, type) => ({
        ...obj,
        [type]: getBareObject ? this.getObjectByType(data, type) : this.getObjectByType(data, type)?.value
      }),
      {}
    )
  }

  // We use this to get an array of values for repetitive data object keys
  public getObjectsByType<ArrayItemType, ValueItemType>(
    data:
      | (ArrayItemType & {
          type?: string | undefined
          value?: unknown | undefined
        })[]
      | undefined,
    objectType: string
  ) {
    return data?.filter((item) => item?.type === objectType)?.map((item) => item?.value) as ValueItemType
  }

  async GET(endpoint = '/', options = {}, config = {absolute: false}) {
    return axios.get(config.absolute ? endpoint : this.HOST + endpoint, {
      ...DEFAULT_OPTIONS,
      ...options
    })
  }

  async POST(endpoint = '/', data = {}, options = {headers: {}}) {
    return axios.post(this.HOST + endpoint, data, {
      ...DEFAULT_OPTIONS,
      ...options
    })
  }
}

export const queryClient = new QueryClient()

export default new API()
