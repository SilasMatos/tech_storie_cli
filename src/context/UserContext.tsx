import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import Cookies from 'js-cookie'

interface UserContextType {
  token: string | null
  role: string | null
  permissions: string[] | null
  setToken: (token: string | null) => void
  setRole: (role: string | null) => void
  setPermissions: (permissions: string[] | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<string[] | null>(null)

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const userData = Cookies.get('userData')
      ? JSON.parse(Cookies.get('userData')!)
      : null

    if (accessToken) {
      setToken(accessToken)
    }

    if (userData) {
      setRole(userData.FUNCAO)
      if (
        userData.FUNCAO === 'SUPERVISOR(A) DE TELEMARKETING' ||
        userData.FUNCAO === 'SUPERVISOR (A) DE TELEMARKETING - INTERINO' ||
        userData.FUNCAO === 'SUPERVISOR (A) DE TELEMARKETING'
      ) {
        setPermissions(['supervisor'])
      } else {
        setPermissions(['operador'])
      }
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ token, role, permissions, setToken, setRole, setPermissions }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
