import useDeleteMessage from "@hooks/useQueries/useDeleteMessage"
import Avatar from "./Avatar"


interface Props {
	isMyReview: boolean
	reviewId: number
	userName: string
	payload: string
	reviewDate: string
	avatar: string
}
function Message({ isMyReview, reviewId, userName, payload, reviewDate, avatar }: Props) {
	const { deleteMessage } = useDeleteMessage()
	const handleDelete = () => {
		confirm('정말로 삭제 하시겠습니까?') && deleteMessage({ reviewId })
	}
	return (
		<div className="flex items-start space-x-2 group even:flex-row-reverse even:space-x-reverse">
			{avatar ? <Avatar url={avatar} isSmall={true} /> : <div className="w-5 h-5 rounded-full bg-slate-300 sm:w-8 sm:h-8"></div>}
			<div className='w-1/2'>
				<span className='block w-full text-[10px] sm:text-xs font-bold text-left group-even:text-right'>{userName}</span>
				<div className="relative p-1 mt-2 mb-1 text-sm text-gray-700 border border-gray-300 rounded-md sm:p-2 bg-oddComment group-even:bg-evenComment">
					<p className='text-xs line-clamp-3'>{payload}</p>
					{isMyReview && <svg onClick={handleDelete} className="absolute right-0 w-3 h-3 transition-colors cursor-pointer sm:w-4 sm:h-4 -top-4 sm:-top-5 group-even:left-0 hover:fill-red-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
				</div>
				<span className='block w-full text-left group-even:text-right text-[8px] sm:text-[10px] text-gray-500'>{reviewDate}</span>
			</div>
		</div>
	)
}

export default Message