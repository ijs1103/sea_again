import { useQuery } from '@tanstack/react-query'
import { getLikedBeach } from '@utils/fetchers/ownApi'
import { ResponseType } from '@utils/interfaces'

function useLikedBeach(id: string) {
  const { data, isLoading, error } = useQuery<ResponseType>(
    ['likedBeachs', id],
    () => getLikedBeach(id),
    { enabled: !!id }
  )

  return {
    likedBeachRes: data,
    error,
    isLoading,
  }
}

export default useLikedBeach
