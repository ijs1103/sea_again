import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createReview } from '@utils/fetchers/ownApi'
import { ResponseType, createReviewType } from '@utils/interfaces'

function useCreateReview() {
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutation<
    ResponseType,
    AxiosError,
    createReviewType
  >(createReview, {
    onSuccess: (data) => {
      if (!data.ok) alert('로그인 후 후기를 작성해주세요.')
      // invalidateQueries로 muation이 성공하면 자동으로 refetch 해준다
      queryClient.invalidateQueries(['review'])
    },
    onError: (error) => console.log(error),
  })
  return {
    createReview: mutate,
    isLoading,
    error,
  }
}

export default useCreateReview
