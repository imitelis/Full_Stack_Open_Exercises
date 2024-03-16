export function formatDate(string) {
  const date = string.slice(0, 10)
  const splittedDate = date.split('-')
  const year = splittedDate[0]
  const month = splittedDate[1]
  const day = splittedDate[2]
  return `${day}.${month}.${year}`
}
