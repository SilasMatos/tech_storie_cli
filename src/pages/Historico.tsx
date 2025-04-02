import React from 'react'
import { useGetProducts } from '../hook/useQueries'
import DataTable from '../components/DataTable'
import { formatDateTime } from '../utils/formatDateTime'
import { useQueryClient } from '@tanstack/react-query'

const Historico: React.FC = () => {
  const queryClient = useQueryClient()
  const { data, error, isLoading } = useGetProducts()

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>
  }

  interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    stock: number
    supplier: string
    createdby: string
    createdat: string
    updatedat: string
  }

  interface FormattedProduct extends Omit<Product, 'createdat' | 'updatedat'> {
    createdat: string
    updatedat: string
  }

  const formattedData: FormattedProduct[] =
    data?.map((item: Product) => ({
      ...item,
      createdat: formatDateTime(item.createdat),
      updatedat: formatDateTime(item.updatedat)
    })) || []

  const columns = [
    { label: 'Nome', accessor: 'name' },
    { label: 'Descrição', accessor: 'description' },
    { label: 'Preço', accessor: 'price' },
    { label: 'Categoria', accessor: 'category' },
    { label: 'Estoque', accessor: 'stock' },
    { label: 'Fornecedor', accessor: 'supplier' },
    { label: 'Criado por', accessor: 'createdby' },
    { label: 'Criado em', accessor: 'createdat' },
    { label: 'Atualizado em', accessor: 'updatedat' }
  ]

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  return (
    <div>
      <h1 className="text-lg text-zinc-300">Histórico de Produtos</h1>
      <DataTable
        title="Produtos"
        columns={columns}
        data={formattedData}
        loading={isLoading}
        onRefresh={refreshData}
      />
    </div>
  )
}

export default Historico
