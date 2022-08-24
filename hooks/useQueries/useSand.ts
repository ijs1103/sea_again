import { useQuery } from '@tanstack/react-query'
import { CheckResponse } from '@utils/interfaces'
import { getSand } from '@utils/fetchers/publicApi'

function useSand(sido_nm: string, sta_nm: string) {
  const {
    data: sand,
    isLoading,
    error,
  } = useQuery<CheckResponse>(['sand'], () => getSand(sido_nm, sta_nm), {
    enabled: !!sido_nm && !!sta_nm,
  })
  return {
    sand,
    isLoading,
    error,
  }
}

export default useSand
