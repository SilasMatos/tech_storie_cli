import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { InsertProducts, InsertSupplier } from '../api/Mutations'
import { Products, Suppliers } from '../types/types'

export function useInsertProduct(
  options?: UseMutationOptions<any, Error, Products>
) {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: (payload: Products) => InsertProducts(payload),
    retry: 0,
    ...options
  })
}

export function useCreateSuppliers(
  options?: UseMutationOptions<any, Error, Suppliers>
) {
  return useMutation({
    mutationKey: ['suppliers'],
    mutationFn: (payload: Suppliers) => InsertSupplier(payload),
    retry: 0,
    ...options
  })
}
