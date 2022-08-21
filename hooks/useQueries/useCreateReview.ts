import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createReview } from '@utils/fetchers/ownApi'
import { ResponseType, createReviewType } from '@utils/interfaces'

function useCreateReview(refetcher: () => void) {
  const { mutate, isLoading, error } = useMutation<
    ResponseType,
    AxiosError,
    createReviewType
  >(createReview, {
    onSuccess: (data) => {
      if (!data.ok) alert('로그인 후 후기를 작성해주세요.')
      // 후기 작성이 완료되면 후기 데이터 refetch
      refetcher()
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
