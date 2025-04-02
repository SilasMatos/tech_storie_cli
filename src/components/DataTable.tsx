import React, { useState, useEffect } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { Maximize, Columns3, Search, Edit, Trash2 } from 'lucide-react'
import { Modal, Form, Input, InputNumber, Select, Button, message } from 'antd'
import { useDeleteProduct, useUpdateProduct } from '../hook/useMutation'

interface Column {
  label: string
  accessor: string
  render?: (item: Record<string, any>) => React.ReactNode
}

type SortDirection = 'ascending' | 'descending'

interface SortConfig {
  key: string
  direction: SortDirection
}

interface DataTableProps {
  title: string
  columns: Column[]
  data: Record<string, any>[]
  loading: boolean
  onRefresh?: () => void
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  loading,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.accessor)
  )
  const [lazyLoadedData, setLazyLoadedData] = useState<Record<string, any>[]>(
    []
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
  const [currentItem, setCurrentItem] = useState<Record<string, any> | null>(
    null
  )
  const [form] = Form.useForm()

  // Mutações para editar e deletar produtos
  const deleteProduct = useDeleteProduct({
    onSuccess: () => {
      message.success('Produto excluído com sucesso!')
      setDeleteModalVisible(false)
      onRefresh && onRefresh()
    },
    onError: error => {
      message.error(`Erro ao excluir produto: ${error.message}`)
    }
  })

  const updateProduct = useUpdateProduct(currentItem?.id || '', {
    onSuccess: () => {
      message.success('Produto atualizado com sucesso!')
      setEditModalVisible(false)
      onRefresh && onRefresh()
    },
    onError: error => {
      message.error(`Erro ao atualizar produto: ${error.message}`)
    }
  })

  useEffect(() => {
    const loadMoreData = () => {
      const newData = data.slice(0, lazyLoadedData.length + 10)
      setLazyLoadedData(newData)
    }

    if (lazyLoadedData.length < data.length) {
      loadMoreData()
    }
  }, [data, lazyLoadedData])

  // Atualizar o formulário quando o item atual muda
  useEffect(() => {
    if (currentItem && editModalVisible) {
      form.setFieldsValue(currentItem)
    }
  }, [currentItem, editModalVisible, form])

  const filteredData = lazyLoadedData.filter(row =>
    columns.some(col =>
      String(row[col.accessor] ?? '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1
    if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedData.length / rowsPerPage)
  const displayedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const handleSort = (key: string) => {
    let direction: SortDirection = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const toggleColumnVisibility = (columnAccessor: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnAccessor)
        ? prev.filter(col => col !== columnAccessor)
        : [...prev, columnAccessor]
    )
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

  const handleEdit = (item: Record<string, any>) => {
    setCurrentItem(item)
    setEditModalVisible(true)
  }

  const handleDelete = (item: Record<string, any>) => {
    setCurrentItem(item)
    setDeleteModalVisible(true)
  }

  const handleUpdateSubmit = (values: any) => {
    if (currentItem?.id) {
      updateProduct.mutate({
        ...values,
        id: currentItem.id
      })
    }
  }

  const handleDeleteConfirm = () => {
    if (currentItem?.id) {
      deleteProduct.mutate(currentItem.id)
    }
  }

  // Adicionando colunas de ação
  const allColumns = [
    ...columns,
    {
      label: 'Ações',
      accessor: 'actions',
      render: (item: Record<string, any>) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            title="Editar"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="data-table-container">
      <div className="search-container">
        <div className="font-medium text-lg text-dark-text2">{title}</div>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar dados..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border border-dark bg-dark-bg-soft text-dark-text2 text-sm mr-3 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-dark-hover"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted" />
          </div>
          <div className="text-xl flex justify-center items-center p-1 mb-1 rounded-md cursor-pointer bg-dark-bg-button hover:bg-dark-hover text-dark-text2">
            <Maximize />
          </div>
          <div
            className="text-xl flex justify-center items-center p-1 mb-1 rounded-md cursor-pointer bg-dark-bg-button hover:bg-dark-hover text-dark-text2"
            onClick={toggleDropdown}
          >
            <Columns3 />
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="column-visibility-dropdown">
          <p className="text-dark-text2">Selecionar Colunas:</p>
          {columns.map(col => (
            <label key={col.accessor}>
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.accessor)}
                onChange={() => toggleColumnVisibility(col.accessor)}
                className="accent-dark-accent"
              />
              <span className="font-medium text-dark-text2 text-sm">
                {' '}
                {col.label}
              </span>
            </label>
          ))}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <p className="text-dark-text2">Carregando dados...</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="no-data-container">
          <p className="no-data-text">Nenhum dado disponível</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-wrapper">
            <div className="table-inner-wrapper">
              <div className="table-scroll-container">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      {allColumns
                        .filter(
                          col =>
                            visibleColumns.includes(col.accessor) ||
                            col.accessor === 'actions'
                        )
                        .map(col => (
                          <th
                            key={col.accessor}
                            scope="col"
                            className="table-header-cell"
                            onClick={
                              col.accessor !== 'actions'
                                ? () => handleSort(col.accessor)
                                : undefined
                            }
                          >
                            <div className="sortable-header">
                              <span>{col.label}</span>
                              {col.accessor !== 'actions' &&
                                (sortConfig?.key === col.accessor ? (
                                  sortConfig.direction === 'ascending' ? (
                                    <IoIosArrowUp className="sort-icon active" />
                                  ) : (
                                    <IoIosArrowDown className="sort-icon active" />
                                  )
                                ) : (
                                  <IoIosArrowUp className="sort-icon hover-only" />
                                ))}
                            </div>
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {displayedData.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`table-row ${
                          rowIndex % 2 === 0
                            ? 'table-row-even'
                            : 'table-row-odd'
                        }`}
                      >
                        {allColumns
                          .filter(
                            col =>
                              visibleColumns.includes(col.accessor) ||
                              col.accessor === 'actions'
                          )
                          .map((col, colIndex) => (
                            <td key={colIndex} className="table-cell">
                              {col.accessor === 'actions'
                                ? col.render
                                  ? col.render(row)
                                  : '-'
                                : row[col.accessor] ?? '-'}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="pagination-container">
            <div className="mr-4 flex items-center">
              <span className="text-sm font-medium mr-2 text-dark-text2">
                Linhas por página
              </span>
              <select
                value={rowsPerPage}
                onChange={e => setRowsPerPage(Number(e.target.value))}
                className="text-dark-text2 bg-dark-bg-soft border border-dark hover:bg-dark-hover focus:ring-2 focus:ring-dark-hover font-medium rounded-lg text-xs px-3 py-1 me-2"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="pagination-info">
              <p className="text-sm text-dark-text2">
                Página {currentPage} de {totalPages}
              </p>
            </div>
            <button
              disabled={currentPage === 1}
              className="pagination-button disabled:opacity-50 disabled:cursor-not-allowed bg-dark-bg-button hover:bg-dark-hover text-dark-text2 border-dark"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Anterior
            </button>
            <button
              disabled={currentPage === totalPages}
              className="pagination-button disabled:opacity-50 disabled:cursor-not-allowed bg-dark-bg-button hover:bg-dark-hover text-dark-text2 border-dark"
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
            >
              Próxima
            </button>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      <Modal
        title="Editar Produto"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateSubmit}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              { required: true, message: 'Por favor, insira o nome do produto' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descrição"
            rules={[
              { required: true, message: 'Por favor, insira a descrição' }
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Preço"
            rules={[{ required: true, message: 'Por favor, insira o preço' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value =>
                `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value!.replace(/R\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Categoria"
            rules={[
              { required: true, message: 'Por favor, selecione a categoria' }
            ]}
          >
            <Select>
              <Select.Option value="Eletrônicos">Eletrônicos</Select.Option>
              <Select.Option value="Roupas">Roupas</Select.Option>
              <Select.Option value="Alimentos">Alimentos</Select.Option>
              <Select.Option value="Livros">Livros</Select.Option>
              <Select.Option value="Outros">Outros</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="stock"
            label="Estoque"
            rules={[
              {
                required: true,
                message: 'Por favor, insira a quantidade em estoque'
              }
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="supplier"
            label="Fornecedor"
            rules={[
              { required: true, message: 'Por favor, insira o fornecedor' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditModalVisible(false)}>
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateProduct.isPending}
              >
                Atualizar
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        title="Confirmar Exclusão"
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancelar
          </Button>,
          <Button
            key="delete"
            danger
            type="primary"
            loading={deleteProduct.isPending}
            onClick={handleDeleteConfirm}
          >
            Excluir
          </Button>
        ]}
      >
        <p>Tem certeza que deseja excluir o produto "{currentItem?.name}"?</p>
        <p>Esta ação não pode ser desfeita.</p>
      </Modal>
    </div>
  )
}

export default DataTable
