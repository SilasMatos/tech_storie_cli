import React, { useRef } from 'react'
import { X } from 'lucide-react'
import { TriangleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { message } from 'antd'

interface LogoutModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleCloseClick = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('userData')
    Cookies.remove('selectedOffers')
    Cookies.remove('cod_cidade')

    Cookies.remove('numero_contrato')
    Cookies.remove('segmento')
    Cookies.remove('motivo_cancelamento')
    Cookies.remove('submotivo_cancelamento')

    message.success('Você saiu da sua conta com sucesso!')
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative w-full max-w-sm p-6 mx-auto my-auto bg-white dark:bg-dark-box rounded-xl shadow-xl"
      >
        <button
          onClick={handleCloseClick}
          className="absolute top-3 right-3 p-2 text-gray-900 dark:text-dark-text"
        >
          <X />
        </button>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-progress-red rounded-full">
            <TriangleAlert color="red" />
          </div>
          <div className="mt-3">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-dark-text">
              Sair da conta
            </h3>
            <div className="mt-2 mb-3">
              <p className="text-sm text-gray-500 dark:text-dark-muted">
                Tem certeza que deseja sair da sua conta?
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-dark-bg-soft">
          <button
            type="button"
            onClick={handleCloseClick}
            className="w-full px-3 py-2 text-sm font-semibold text-gray-900 bg-white dark:bg-dark-accent dark:text-dark-text rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-dark-muted hover:bg-gray-50 dark:hover:bg-dark-hover"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 dark:bg-progress-red rounded-md shadow-sm hover:bg-red-500 dark:hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal

export type { LogoutModalProps }
