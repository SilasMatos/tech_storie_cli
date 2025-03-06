import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { InsertProducts } from '../api/Mutations'
import { Products } from '../types/types'

export function useCreateTabulation(
  options?: UseMutationOptions<any, Error, Products>
) {
  return useMutation({
    mutationKey: ['atendimentos'],
    mutationFn: (payload: Products) => InsertProducts(payload),
    retry: 3,
    ...options
  })
}
