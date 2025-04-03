import React from 'react'
import { Outlet } from 'react-router-dom'
import { LayoutDashboard, History, PackagePlus } from 'lucide-react'

import Header from '../components/layout/Header'
import { Sidebar, SidebarItem } from '../components/layout/Sidebar'

const Layout: React.FC = () => {
  return (
    <>
      <div className="h-screen flex bg-dark-bg ">
        <div className="flex-shrink-0">
          <Sidebar>
            {' '}
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              to="/"
            />
            <SidebarItem
              icon={<History size={20} />}
              text="Historico"
              to="historico"
              alert
            />
            <SidebarItem
              icon={<PackagePlus size={20} />}
              text="Cadastro de produtos"
              to="inserir-produtos"
              alert
            />
          </Sidebar>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-4 scroll-edit ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
