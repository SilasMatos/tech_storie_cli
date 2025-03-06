import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface PrivateProps {
  children: React.ReactNode
}

const Private: React.FC<PrivateProps> = ({ children }) => {
  const accessToken = Cookies.get('accessToken')

  if (!accessToken) {
    return <Navigate to="/login" />
  }

  return <>{children} </>
}

export default Private
