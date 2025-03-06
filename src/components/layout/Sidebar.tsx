// Sidebar.tsx

import { createContext, useContext, useState, ReactNode } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/store.png'

interface SidebarContextType {
  expanded: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProps {
  children: ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <nav className="h-[98%] flex flex-col bg-dark-box border-border-dark shadow-sm  m-2 px-2 rounded-lg relative">
      <div className="p-4 pb-2 flex justify-between items-center">
        <button
          onClick={() => setExpanded(curr => !curr)}
          className="p-1 bg-gray-800 shadow-md border border-border-dark rounded-lg absolute -right-3 "
        >
          {expanded ? (
            <IoIosArrowBack className="text-gray-600" />
          ) : (
            <IoIosArrowForward className="text-gray-600" />
          )}
        </button>
        <div className="gap-2 flex items-center justify-around">
          <div className=" bg-gray-800 rounded-lg shadow-lg ">
            <img src={logo} alt="Logo" className="w-9" />
          </div>
          {expanded && (
            <div>
              <span className="text-purple-600  text-xl  italic font-medium">
                Tech Storie
              </span>
            </div>
          )}
        </div>
      </div>

      <SidebarContext.Provider value={{ expanded }}>
        <ul className="flex-1 px-3 mt-5">{children}</ul>
      </SidebarContext.Provider>

      <div className=" border-light-border dark:border-dark-border flex p-3">
        <div
          className={`flex justify-center items-center overflow-hidden  text-center ${
            expanded ? 'w-full' : 'w-0'
          }`}
        ></div>
      </div>
    </nav>
  )
}

interface SidebarItemProps {
  icon: ReactNode
  text: string
  to: string
  active?: boolean
  alert?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  to,

  alert = false
}) => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('SidebarItem must be used within a Sidebar')
  }

  const { expanded } = context

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative flex items-center py-2 px-3 my-4  font-medium rounded-lg cursor-pointer shadow-sm transition-colors group ${
          isActive
            ? 'bg-blues text-white dark:bg-dark-accentLight  dark:text-dark-textPrimary'
            : 'bg-blues-hover bg-dark-bg-soft-table text-gray-300'
        }`
      }
    >
      {icon}
      <span
        className={`overflow-hidden transition-all whitespace-nowrap ${
          expanded ? 'w-44 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-light-accent dark:bg-dark-accent ${
            expanded ? '' : 'top-2'
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 shadow-xl z-10 py-1 ml-6 bg-purple-600 dark:bg-dark-accentLight text-light-textPrimary dark:text-dark-textPrimary text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap`}
        >
          {text}
        </div>
      )}
    </NavLink>
  )
}

export { Sidebar, SidebarItem }
