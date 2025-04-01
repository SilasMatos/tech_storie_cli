import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getProducts, getSuppliers } from '../api/Queries'

export function useGetProducts(options?: UseQueryOptions<any, Error>) {
  return useQuery<any, Error>({
    queryKey: ['/products'],
    queryFn: getProducts,
    retry: 0,
    ...options
  })
}

export function useGetSuppliers(options?: UseQueryOptions<any, Error>) {
  return useQuery<any, Error>({
    queryKey: ['/suppliers'],
    queryFn: getSuppliers,
    retry: 3,
    ...options
  })
}
