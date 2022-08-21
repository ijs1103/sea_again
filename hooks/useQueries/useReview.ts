import { useQuery } from '@tanstack/react-query'
import { getReviews } from '@utils/fetchers/ownApi'
import { Review } from '@prisma/client'

interface ReviewsResponse {
  reviews: Review[]
  isEnd: boolean
  total_cnt: number
}

function useReview(beachName: string, page: number) {
  const {
    data,
    isLoading,
    error,
    refetch: reviewsRefetch,
  } = useQuery<ReviewsResponse>(['review', beachName, page], () =>
    getReviews({ beachName, limit: 5, offset: page > 0 ? (page - 1) * 5 : 0 })
  )

  return {
    data,
    isLoading,
    error,
    reviewsRefetch,
  }
}

export default useReview
