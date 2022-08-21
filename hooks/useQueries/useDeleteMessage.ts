import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteReview } from '@utils/fetchers/ownApi'
import { ResponseType } from '@utils/interfaces'
import { AxiosError } from 'axios'

function useDeleteMessage() {
  const queryClient = useQueryClient()

  const {
    mutate: deleteMessage,
    isLoading,
    error,
  } = useMutation<ResponseType, AxiosError, { reviewId: number }>(
    deleteReview,
    {
      onSuccess: (data) => {
        if (data.ok) {
          queryClient.invalidateQueries(['review'])
        } else {
          alert(data.error)
        }
      },
      onError: (error) => console.log(error),
    }
  )
  return {
    deleteMessage,
    isLoading,
    error,
  }
}

export default useDeleteMessage
