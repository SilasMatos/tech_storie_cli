import React, { useState } from 'react'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Button from '../components/common/Button'

function InsertProducts() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    supplier: '',
    createdBy: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  const handle = () => {
    console.log('handle')
  }

  return (
    <>
      <div className="flex flex-col bg-dark-bg-soft p-6 m-2 border-2 border-border-dark rounded-xl">
        <div className=" ">
          <h1 className="text-lg font-bold text-gray-100">Inserir Produtos</h1>
          <p className="text-sm font-medium text-gray-200">
            Realize o cadastro de produtos
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col  mt-5">
          <div className="flex gap-2 w-full">
            <Input
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-2 w-full items-center">
            <Input
              label="Preço"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              label="Categoria"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-2 w-full items-center">
            <Input
              label="Estoque"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
            />
            <Select
              label="Fornecedor"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              options={[
                { value: '1', label: 'Fornecedor 1' },
                { value: '2', label: 'Fornecedor 2' }
              ]}
              required
            />
          </div>
          <div>
            <Button
              title="Enviar"
              type="submit"
              disabled={false}
              handle={handle}
            ></Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default InsertProducts
