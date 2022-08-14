import Message from '@components/layout/Message'
import { Review } from '@prisma/client'
import { cls } from '@utils/index'
import { ResponseType, createReviewType } from '@utils/interfaces'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createReview } from '@utils/axiosFunctions/ownApi'
import { useForm } from 'react-hook-form'
import {
	REVIEW_REGEX,
	FORM_ERR_MSG
} from '@utils/constants'
import useAuth from '@hooks/useAuth'
interface Props {
	reviews: Review[]
	beachName: string
}
interface CommentForm {
	payload: string
}
function Comment({ reviews, beachName }: Props) {
	const { isLogin } = useAuth('getProfile')
	const { register, handleSubmit, formState } =
		useForm<CommentForm>({ mode: 'onChange' })

	const { mutate: newComment, isLoading, isSuccess, isError, error } = useMutation<ResponseType, AxiosError, createReviewType>(createReview, {
		onSuccess: ({ data }) => {
			if (!data.ok) alert('로그인 후 후기를 작성해주세요.')
		},
		onError: (error) => console.log('axios 에러 : ', error)
	})

	const onValid = (form: CommentForm) => {
		newComment({ ...form, beachName })
	}
	return (
		<div className='p-2'>
			<form onSubmit={handleSubmit(onValid)}>
				<label htmlFor="review" className="sr-only">해수욕장 후기</label>
				<div className="flex items-center py-2 px-3 bg-lightGray rounded-lg ">
					<textarea {...register("payload", { required: true, pattern: { value: REVIEW_REGEX, message: FORM_ERR_MSG.invalidReview } })} id="review" rows={1} className="block mr-4 p-2.5 w-full text-xs text-gray-900 bg-white rounded-lg outline-none border-2 border-gray-300 focus:ring-primary focus:border-primary " placeholder="후기를 남겨주세요..."></textarea>
					<button disabled={!isLogin || !formState.isValid} type="submit" className="disabled:opacity-10 inline-flex justify-center p-2 text-primary rounded-full cursor-pointer hover:bg-blue-100 ">
						<svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
						<span className="sr-only">Send message</span>
					</button>
				</div>
				{formState.errors['payload']?.message && <p className="mt-2 text-xs text-red-600">{formState.errors['payload']?.message}</p>}

			</form>
			<div className='mt-4 space-y-2'>
				<Message reviewDate='09-11 13:52' userName='유저1' review='테스트 테스트 테스트테스트테스트테스트 테스트 테스트 테스트테스트테스트테스트테스트 테스트 테스트테스트테스트테스트테스트 테스트 테스트테스트테스트테스트테스트 테스트 테스트테스트테스트테스트' />
				<Message reviewDate='09-11 13:52' userName='유저1' review='테스트 테스트 테스트테스트테스트테스트' />
				<Message reviewDate='09-11 13:52' userName='유저1' review='테스트 테스트 테스트테스트테스트테스트' />
				<Message reviewDate='09-11 13:52' userName='유저1' review='테스트 테스트 테스트테스트테스트테스트' />
			</div>

		</div>
	)
}

export default Comment