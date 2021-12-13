export type TWishListItem = {
  id: string | number
  name: string
  text: string
  images?: string[]
}

export type TWishList = {
  name: string
  items: TWishListItem[]
}


