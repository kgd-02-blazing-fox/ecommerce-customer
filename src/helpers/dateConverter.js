function dateConverter (newDate) {
  const fullDate = new Date(newDate)
  const date = fullDate.getDate()
  const month = fullDate.getMonth() + 1
  const year = fullDate.getFullYear()
  return `${date} - ${month} - ${year}`
}

module.exports = dateConverter
