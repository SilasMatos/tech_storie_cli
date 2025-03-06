import React from 'react'

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Página não encontrada</p>
        <p className="text-gray-500 mt-2">
          Desculpe, a página que você está procurando não existe.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  )
}

export default NotFound
