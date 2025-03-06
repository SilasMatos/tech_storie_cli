export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  })
  return `${formattedDate} ${formattedTime}`
}