export class CWishListItem {
  constructor (
    id: string | number,
    name: string,
    text: string,
    wishListId: string,
    images?: string[],
    links?: string[],
  ) {
    this.id = id
    this.name = name
    this.text = text
    this.wishListId = wishListId
    this.images = images
    this.links = links
  }
  id: string | number
  name: string
  text: string
  wishListId: string
  images?: string[]
  links?: string[]
}

export type TWishList = {
  id: string,
  name: string
  items: CWishListItem[]
}
