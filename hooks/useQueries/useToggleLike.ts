import { useMutation } from '@tanstack/react-query'
import { toggleLikeFetcher } from '@utils/fetchers/ownApi'
import { AxiosError, AxiosResponse } from 'axios'
import { ResponseType } from '@utils/interfaces'

function useToggleLike() {
  const { mutate: toggleLike } = useMutation<
    AxiosResponse<ResponseType>,
    AxiosError,
    string
  >(toggleLikeFetcher)

  return {
    toggleLike,
  }
}

export default useToggleLike
