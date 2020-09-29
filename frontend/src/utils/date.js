const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getDate = () => {
  const today = new Date()
  let minutes = today.getMinutes()
  if (minutes < 10) {
    minutes = `0${today.getMinutes()}`
  }
  const time = `${today.getHours()}:${minutes}`
  const month = monthNames[today.getMonth() - 1].slice(0, 3)
  const date = `${month} ${today.getDate()} | ${time}`

  return date
}
