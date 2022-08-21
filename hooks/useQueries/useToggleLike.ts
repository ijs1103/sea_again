import { useMutation } from '@tanstack/react-query'
import { toggleLikeFetcher } from '@utils/fetchers/ownApi'
import { AxiosError } from 'axios'
import { ResponseType } from '@utils/interfaces'

function useToggleLike() {
  const { mutate: toggleLike, data } = useMutation<
    ResponseType,
    AxiosError,
    string
  >(toggleLikeFetcher)

  return {
    toggleLike,
  }
}

export default useToggleLike
