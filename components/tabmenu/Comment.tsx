import Message from '@components/layout/Message'
import { Review } from '@prisma/client'
import { cls } from '@utils/index'
import { ResponseType, createReviewType } from '@utils/interfaces'
import { AxiosError } from 'axios'
import { createReview, getReviews } from '@utils/axiosFunctions/ownApi'
import { useForm } from 'react-hook-form'
import {
	REVIEW_REGEX,
	FORM_ERR_MSG,
	PAGE_LIMIT
} from '@utils/constants'
import useAuth from '@hooks/useAuth'
import { useCallback, useState, useEffect, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import Loader from '@components/Loader'
import Pagination from '@components/layout/Pagination'


interface ReviewWith extends Review {
	review: Review
	user: {
		name: string
	}
}
interface Props {
	beachName: string
}
interface ReviewForm {
	payload: string
}
function Review({ beachName }: Props) {
	const { isLogin, profile } = useAuth('getProfile')
	const { register, handleSubmit, formState, reset } =
		useForm<ReviewForm>({ mode: 'onChange' })
	const [page, setPage] = useState(1)
	const { data: reviewData, isLoading, refetch } = useQuery<any>(['review', beachName, page], () => getReviews({ beachName, limit: 5, offset: page > 0 ? (page - 1) * 5 : 0 }), { keepPreviousData: true })
	const { mutate: newReviewMutate } = useMutation<ResponseType, AxiosError, createReviewType>(createReview, {
		onSuccess: (data) => {
			if (!data.ok) alert('로그인 후 후기를 작성해주세요.')
			// 후기 작성이 완료되면 후기 데이터 refetch
			refetch()
		},
		onError: (error) => console.log('axios 에러 : ', error)
	})
	const onValid = (form: ReviewForm) => {
		newReviewMutate({ ...form, beachName })
		reset({ "payload": "" })
	}
	const parseCreatedAt = useCallback((createdAt: Date) => {
		const parsed = createdAt?.toString()
		return `${parsed?.slice(0, 4)} ${parsed?.slice(5, 10)} ${parsed?.slice(11, 16)}`
	}, [])
	const pageLength = Math.ceil(reviewData?.total_cnt / PAGE_LIMIT)
	const reviewRef = useRef<HTMLDivElement | null>(null)
	const scollToTop = useCallback(() => {
		if (!reviewRef.current) return
		reviewRef.current.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])
	useEffect(() => {
		scollToTop()
	}, [page])
	return (
		<div className='h-full p-2 overflow-y-auto' ref={reviewRef}>
			<form onSubmit={handleSubmit(onValid)}>
				<label htmlFor="review" className="sr-only">해수욕장 후기</label>
				<div className="flex items-center py-1 px-3 bg-lightGray rounded-lg ">
					<textarea disabled={!isLogin} {...register("payload", { required: true, pattern: { value: REVIEW_REGEX, message: FORM_ERR_MSG.invalidReview } })} id="review" rows={1} className="block mr-4 p-2 w-full text-xs text-gray-900 bg-white rounded-lg outline-none border-2 border-gray-300 focus:ring-primary focus:border-primary " placeholder="후기를 남겨주세요..."></textarea>
					<button disabled={!isLogin || !formState.isValid} type="submit" className="disabled:opacity-10 inline-flex justify-center p-2 text-primary rounded-full cursor-pointer hover:bg-blue-100 ">
						<svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
						<span className="sr-only">Send message</span>
					</button>
				</div>
				{formState.errors['payload']?.message && <p className="mt-2 text-xs text-red-600">{formState.errors['payload']?.message}</p>}

			</form>
			<div className='mt-4 space-y-1 relative'>
				{isLoading ? <Loader /> :
					// isMyReview: 내가 작성한 후기만 삭제를 허용 하기 위해, 내 후기 여부를 나타내는 boolean 값 
					reviewData?.reviews?.map((review: any) => <Message isMyReview={profile?.id === review?.userId} reviewId={review?.id} key={review?.id} reviewDate={parseCreatedAt(review?.createdAt)} userName={review?.user?.name} payload={review?.payload} onReFetch={refetch} />)
				}
				<Pagination limit={pageLength} page={page} setPage={setPage} />
			</div>

		</div>
	)
}

export default Review