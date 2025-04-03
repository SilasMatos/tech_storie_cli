import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'
import Private from './Private'
import '../styles/index.css'
import Layout from '../layout/Layout'
import NotFound from '../pages/NotFound'
import InsertProducts from '../pages/InsertProducts'
import Historico from '../pages/Historico'

const Rotas: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Private>
                <InsertProducts />
              </Private>
            }
          />

          <Route
            path="historico"
            element={
              <Private>
                <Historico />
              </Private>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default Rotas
