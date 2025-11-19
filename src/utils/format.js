const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
})

export function formatCurrency(value) {
  return currencyFormatter.format(value ?? 0)
}

export function truncateText(text, limit = 120) {
  if (!text) return ''
  if (text.length <= limit) return text
  return `${text.slice(0, limit).trim()}…`
}

