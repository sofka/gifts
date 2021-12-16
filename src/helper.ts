export const isUUID = (uuid: string) => {
  let s = '' + uuid

  const match = s.match(
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
  )
  return match === null
}

export const uuid = () => {
  let date = new Date().getTime()
  let uuid = 'xxxxxxxx-yxxx-4xxxxxxx-xxxxx-xxxxxxxx'.replace(/[xy]/g, function (
    u
  ) {
    let reg = (date + Math.random() * 32) % 32 | 0
    date = Math.floor(date / 32)
    return (u === 'x' ? reg : (reg & 0x3) | 0x8).toString(32)
  })
  return uuid
}

export const isValidUrl = (url: string) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g
  return urlRegex.test(url)
}
