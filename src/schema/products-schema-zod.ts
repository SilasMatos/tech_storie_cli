import { z } from 'zod'


export const productFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  price: z
    .string()
    .min(1, 'Preço é obrigatório')
    .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Preço deve ser um número positivo'
    }),
  category: z.string().min(2, 'Categoria deve ter pelo menos 2 caracteres'),
  stock: z
    .string()
    .min(1, 'Estoque é obrigatório')
    .refine(val => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: 'Estoque deve ser um número não negativo'
    }),
  supplier: z.string().min(1, 'Fornecedor é obrigatório'),
  createdBy: z.string().optional()
})

export type ProductFormData = z.infer<typeof productFormSchema>

export const productApiSchema = productFormSchema.transform(data => ({
  name: data.name,
  description: data.description,
  price: parseFloat(data.price),
  category: data.category,
  stock: parseInt(data.stock),
  supplier: parseInt(data.supplier),
  createdBy: data.createdBy || ''
}))

export type ProductApiData = z.infer<typeof productApiSchema>