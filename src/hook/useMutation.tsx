import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import {
  InsertProducts,
  InsertSupplier,
  UpdateProduct,
  DeleteProduct,
  Login
} from '../api/Mutations'
import { Products, Suppliers, LoginCredentials } from '../types/types'

export function useLoginAuth(
  options?: UseMutationOptions<any, Error, LoginCredentials>
) {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginCredentials) => Login(payload),
    retry: 3,
    ...options
  })
}
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

export function useUpdateProduct(
  id: string,
  options?: UseMutationOptions<any, Error, Products>
) {
  return useMutation({
    mutationKey: ['products', id],
    mutationFn: (payload: Products) => UpdateProduct(id, payload),
    retry: 0,
    ...options
  })
}

export function useDeleteProduct(
  options?: UseMutationOptions<any, Error, string>
) {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: (id: string) => DeleteProduct(id),
    retry: 0,
    ...options
  })
}
