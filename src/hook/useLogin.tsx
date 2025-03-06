import { useMutation } from '@tanstack/react-query'
import { login } from '../service/apiLogin'
import Cookies from 'js-cookie'

import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation<any, unknown, { password: string; email: string }>({
    mutationFn: login,
    onSuccess: data => {
      try {
        console.log(data)

        Cookies.set('accessToken', data.token)
        message.success('Login realizado com sucesso!')
        navigate('/')
      } catch (error) {
        message.error('Erro ao processar os dados de login.')
      }
    },
    onError: (error: any) => {
      message.error(`Erro ao realizar login: ${error.message}`)
    }
  })
}
