import Cookies from 'js-cookie'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useLoginAuth } from './useMutation'

export const useLogin = () => {
  const navigate = useNavigate()
  return useLoginAuth({
    onSuccess: data => {
      try {
        Cookies.set('accessToken', data.token, {
          expires: 1 / 24
        })
        setTimeout(() => {
          navigate('/')
        }, 1000)
        message.success('Login realizado com sucesso!')
      } catch (error) {
        message.error('Erro ao processar os dados de login.')
      }
    },
    onError: (error: any) => {
      message.error(`Erro ao realizar login: ${error.message}`)
    }
  })
}
