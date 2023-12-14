import type { QueryKey, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

export const useApiQuery = <TData>(path: string, queryKey: QueryKey): UseQueryResult<TData> => {
  return useQuery<TData>({
    queryKey,
    queryFn: async () => await fetch(`${window.appConfig.basepath}${path}`).then((res) => res.json())
  })
}
