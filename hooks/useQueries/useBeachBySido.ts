import { useQuery } from '@tanstack/react-query'
import { getBeach } from '@utils/fetchers/publicApi'
import { BeachResponse } from '@utils/interfaces'

function useBeachBySido(sido: string) {
  const {
    data: beachs,
    isLoading,
    error,
  } = useQuery<BeachResponse[]>(['beach', sido], () => getBeach(sido))

  return {
    beachs,
    isLoading,
    error,
  }
}

export default useBeachBySido
