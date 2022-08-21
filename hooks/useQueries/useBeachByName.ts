import { useQuery } from '@tanstack/react-query'
import { getBeachByName } from '@utils/fetchers/ownApi'
import { ResponseType } from '@utils/interfaces'

function useBeachByName(beachName: string) {
  const { data, isLoading, error } = useQuery<ResponseType>(
    ['beachByName', beachName],
    () => getBeachByName(beachName)
  )
  return {
    data,
    isLoading,
    error,
  }
}

export default useBeachByName
