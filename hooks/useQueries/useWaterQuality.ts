import { useQuery } from '@tanstack/react-query'
import { CheckResponse } from '@utils/interfaces'
import { getWater } from '@utils/fetchers/publicApi'

function useWaterQuality(sido_nm: string, sta_nm: string) {
  const {
    data: waterQuality,
    isLoading,
    error,
  } = useQuery<CheckResponse>(['water'], () => getWater(sido_nm, sta_nm), {
    enabled: !!sido_nm && !!sta_nm,
  })
  return {
    waterQuality,
    isLoading,
    error,
  }
}

export default useWaterQuality
