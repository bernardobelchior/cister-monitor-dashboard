export default function formatDate (date) {
  return date.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'})
}
