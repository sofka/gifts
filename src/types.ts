export class CWishListItem {
  constructor (
    id: string | number,
    name: string,
    text: string,
    images?: string[],
    links?: string[]
  ) {
    this.id = id
    this.name = name
    this.text = text
    this.images = images
    this.links = links
  }
  id: string | number
  name: string
  text: string
  images?: string[]
  links?: string[]
}

export type TWishList = {
  name: string
  items: CWishListItem[]
}
