function priceConverter (number) {
  return new Intl.NumberFormat('in-IN', { style: 'currency', currency: 'IDR' }).format(number)
}

module.exports = priceConverter
