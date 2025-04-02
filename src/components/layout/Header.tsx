import React, { useState } from 'react'
import { Bell, LogOut } from 'lucide-react'
import LogoutModal from '../modals/ModalLogout'
import Cookies from 'js-cookie'
import { formatName } from '../../utils/formatName'

const Header: React.FC = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true)
  }

  let cookiesData = Cookies.get('userData')
  let userData = cookiesData ? JSON.parse(cookiesData) : null
  const formattedName =
    userData && typeof userData.NOME === 'string'
      ? formatName(userData.NOME)
      : 'Usuário'

  return (
    <>
      <header className="p-4 flex justify-between items-center border-b bg-light-background dark:bg-dark-background text-light-textPrimary dark:text-dark-textPrimary border-border-dark ">
        <div className="text-md font-medium text-gray-400">
          Olá, <span className="text-purple-600 italic">{formattedName}</span>
        </div>
        <div className="space-x-3 flex">
          <div className="flex items-center justify-center w-9 h-9 p-2 rounded-lg shadow-md focus:outline-none  text-gray-200 bg-purple-600 hover:bg-light-surface_hover hover:scale-105 ease-in-out duration-300 transition-transform ">
            <Bell size={20} />
          </div>

          <div className="flex items-center justify-center w-9 h-9 p-2 rounded-lg shadow-md focus:outline-none text-gray-200 bg-purple-600  hover:scale-105 ease-in-out duration-300 transition-transform cursor-pointer ">
            <LogOut size={20} onClick={handleLogoutClick} />
          </div>
        </div>
      </header>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        setIsOpen={setIsLogoutModalOpen}
      />
    </>
  )
}

export default Header
