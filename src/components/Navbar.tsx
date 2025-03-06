import logo from '../assets/logo.png'

import { AiOutlineLogout } from 'react-icons/ai'

import { useNavigate } from 'react-router-dom'
import LogoutModal from './modals/ModalLogout'
import { useState } from 'react'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true)
  }

  return (
    <>
      <div className="w-full">
        <nav className="px-0 py-4 flex w-full items-center justify-between max-w-1140px mx-auto">
          <div className="flex items-center space-x-4">
            <div className="p-1 bg-[#349aee] rounded-lg shadow-lg">
              <img src={logo} alt="Logo" className="max-w-8" />
            </div>
            <span className="text-gray-800 text-2xl font-semibold textAnimation">
              Efetivometro
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate('/tabulador')}
              type="button"
              className="py-2 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Voltar
            </button>
            {/* <RiHome5Line
              size={22}
              className="hover:text-blue-600"
              onClick={() => navigate('/')}
            /> */}

            <AiOutlineLogout
              size={22}
              className="hover:text-blue-600"
              title="Sair"
              onClick={handleLogoutClick}
            />
          </div>
        </nav>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        setIsOpen={setIsLogoutModalOpen}
      />
    </>
  )
}

export default Navbar
