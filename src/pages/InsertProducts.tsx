import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import { message } from 'antd'
import Button from '../components/common/Button'
import { useGetSuppliers } from '../hook/useQueries'
import { useInsertProduct } from '../hook/useMutation'
import {
  productFormSchema,
  ProductFormData
} from '../schema/products-schema-zod'
export interface ProductFormDat {
  name: string
  description: string
  price: number
  category: string
  stock: number
  supplier: any
  createdBy: any
}
function InsertProducts() {
  const { data: suppliers = [], isLoading } = useGetSuppliers()
  const { mutate, isPending: isSubmitting } = useInsertProduct()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      supplier: '',
      createdBy: ''
    }
  })

  const onSubmit = async (formData: ProductFormData) => {
    const apiData: ProductFormDat = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      supplier: parseInt(formData.supplier),
      createdBy: formData.createdBy ? parseInt(formData.createdBy) : 0
    }

    mutate(apiData, {
      onSuccess: () => {
        message.success('Produto cadastrado com sucesso!')
      },
      onError: (error: any) => {
        message.error(`Erro ao cadastrar produto: ${error.message}`)
      }
    })
  }

  return (
    <div className="flex flex-col bg-dark-bg-container p-6 m-2 border-2 border-border-dark rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">
          Inserir Produtos
        </h1>
        <p className="text-sm font-medium text-gray-300">
          Realize o cadastro de produtos no sistema
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Nome"
                  {...field}
                  error={errors.name?.message}
                  required
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  label="Descrição"
                  {...field}
                  error={errors.description?.message}
                  required
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  label="Preço"
                  type="number"
                  step="0.01"
                  {...field}
                  error={errors.price?.message}
                  required
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Input
                  label="Categoria"
                  {...field}
                  error={errors.category?.message}
                  required
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <Input
                  label="Estoque"
                  type="number"
                  {...field}
                  error={errors.stock?.message}
                  required
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <Controller
              name="supplier"
              control={control}
              render={({
                field
              }: {
                field: {
                  onChange: (value: any) => void
                  onBlur: () => void
                  value: string
                  name: string
                  ref: React.Ref<any>
                }
              }) => (
                <Select
                  label="Fornecedor"
                  {...field}
                  error={errors.supplier?.message}
                  options={
                    isLoading
                      ? [{ value: '', label: 'Carregando...' }]
                      : suppliers.map(
                          (supplier: { id: number; name: string }) => ({
                            value: supplier.id.toString(),
                            label: supplier.name
                          })
                        )
                  }
                  required
                />
              )}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            title={isSubmitting ? 'Enviando...' : 'Cadastrar Produto'}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  )
}

export default InsertProducts
