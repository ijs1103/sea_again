import Message from '@components/layout/Message'
import { useForm } from 'react-hook-form'
import {
	PAGE_LIMIT
} from '@utils/constants'
import { useCallback, useState, useEffect, useRef } from 'react'
import Loader from '@components/Loader'
import Pagination from '@components/layout/Pagination'
import CommentNotFound from '@components/tabmenu/CommentNotFound'
import useReview from '@hooks/useQueries/useReview'
import useCreateReview from '@hooks/useQueries/useCreateReview'
import useUserInfo from '@hooks/useQueries/useUserInfo'

interface Props {
	beachName: string
}
interface ReviewForm {
	payload: string
}
function Comment({ beachName }: Props) {
	const { isLogin, profile } = useUserInfo()
	const { register, handleSubmit, formState, reset } =
		useForm<ReviewForm>({ mode: 'onChange' })
	const [page, setPage] = useState(1)
	const { data, isLoading } = useReview(beachName, page)
	const { createReview } = useCreateReview()

	const onValid = (form: ReviewForm) => {
		createReview({ ...form, beachName })
		reset({ "payload": "" })
	}
	const parseCreatedAt = useCallback((createdAt: Date) => {
		const parsed = createdAt?.toString()
		return `${parsed?.slice(0, 4)} ${parsed?.slice(5, 10)} ${parsed?.slice(11, 16)}`
	}, [])
	const pageLength = Math.ceil(data?.total_cnt as number / PAGE_LIMIT)
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
				<div className="flex items-center px-3 py-1 rounded-lg bg-lightGray ">
					<textarea disabled={!isLogin} {...register("payload", { required: true, minLength: 5 })} id="review" rows={1} className="block w-full p-1 sm:p-2 mr-4 text-[8px] sm:text-xs text-gray-900 bg-white border-2 border-gray-300 rounded-lg outline-none focus:ring-primary focus:border-primary " placeholder="후기를 남겨주세요..."></textarea>
					<button disabled={!isLogin || !formState.isValid} type="submit" className="inline-flex justify-center p-2 rounded-full cursor-pointer disabled:opacity-10 text-primary hover:bg-blue-100 ">
						<svg aria-hidden="true" className="w-4 h-4 rotate-90 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
						<span className="sr-only">후기 남기기</span>
					</button>
				</div>
				{formState.errors['payload']?.message && <p className="mt-1 sm:mt-2 text-[6px] sm:text-xs text-red-600">{formState.errors['payload']?.message}</p>}
			</form>
			<div className='relative mt-4 space-y-1'>
				{isLoading ? <Loader /> :
					// isMyReview: 내가 작성한 후기만 삭제를 허용 하기 위해, 내 후기 여부를 나타내는 값 
					(data?.total_cnt as number > 0) ?
						data?.reviews?.map((review: any) => <Message isMyReview={profile?.id === review?.userId} reviewId={review?.id} key={review?.id} reviewDate={parseCreatedAt(review?.createdAt)} userName={review?.user?.name} payload={review?.payload} avatar={review?.user?.avatar} />)
						: <CommentNotFound />
				}
				<Pagination isEmpty={data?.total_cnt === 0} limit={pageLength} page={page} setPage={setPage} />
			</div>

		</div>
	)
}

export default Comment