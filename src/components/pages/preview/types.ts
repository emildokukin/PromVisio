export interface Preview {
  id?: number
  meta?: Meta
  title?: string
  content?: Content[]
}

export interface Content {
  type: string
  value: Value
  id: string
}

export interface Value {
  title: string
  text?: string
  image?: Image
}

export interface Image {
  alt: string
  url: string
}

export interface Meta {
  html_url: string
}
