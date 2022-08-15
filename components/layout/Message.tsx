import { useMutation } from '@tanstack/react-query'
import { deleteReview } from '@utils/axiosFunctions/ownApi'
import useAuth from '@hooks/useAuth'
import { ResponseType, createReviewType } from '@utils/interfaces'

import { AxiosError } from 'axios'
import React from 'react'

interface Props {
	isMyReview: boolean
	reviewId: number
	userName: string
	payload: string
	reviewDate: string
	onReFetch: () => void
}
function Message({ isMyReview, reviewId, userName, payload, reviewDate, onReFetch }: Props) {
	const { isLogin } = useAuth('getProfile')
	const { mutate: deleteMutate, isLoading, isSuccess, isError, error } = useMutation<ResponseType, AxiosError, { reviewId: number }>(deleteReview, {
		onSuccess: (data) => {
			if (data.ok) {
				onReFetch()
			} else {
				alert(data.error)
			}
		},
		onError: (error) => console.log('axios 에러 : ', error)
	})
	const handleDelete = () => {
		confirm('정말로 삭제 하시겠습니까?')
		deleteMutate({ reviewId })
	}
	return (
		<div className="group flex items-start space-x-2 even:flex-row-reverse even:space-x-reverse">
			<div className="w-8 h-8 rounded-full bg-slate-300" />
			<div className=' w-1/2'>
				<span className='block w-full text-left group-even:text-right text-xs font-bold'>{userName}</span>
				<div className="relative mt-2 mb-1 text-sm bg-oddComment group-even:bg-evenComment text-gray-700 p-2 border border-gray-300 rounded-md">
					<p className='text-xs line-clamp-3'>{payload}</p>
					{isMyReview && <svg onClick={handleDelete} className="absolute -top-5 right-0 group-even:left-0 w-4 h-4 cursor-pointer transition-colors hover:fill-red-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
				</div>
				<span className='block w-full text-left group-even:text-right text-[10px] text-gray-500'>{reviewDate}</span>
			</div>
		</div>
	)
}

export default Message