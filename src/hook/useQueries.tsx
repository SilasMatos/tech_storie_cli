import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getProducts } from '../api/Queries'

export function useGetProducts(options?: UseQueryOptions<any, Error>) {
  return useQuery<any, Error>({
    queryKey: ['/products'],
    queryFn: getProducts,
    retry: 3,
    ...options
  })
}
