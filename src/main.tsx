import React from 'react'
import ReactDOM from 'react-dom/client'
import Rotas from './routes/router'
import './styles/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UnauthorizedProvider } from './context/UnauthorizedContext'
import { UserProvider } from './context/UserContext'
const queryClient = new QueryClient()
import './components/web-components/multi-step-feedback.js' //

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UnauthorizedProvider>
        <UserProvider>
          <Rotas />
        </UserProvider>
      </UnauthorizedProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
