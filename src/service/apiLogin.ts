export const login = async (credentials: {

  password: string
  email: string
}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao realizar login')
  }

  return response.json()
}
