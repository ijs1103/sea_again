import React from 'react'
interface Props {
	userName: string
	review: string
	reviewDate: string
}

function Message({ userName, review, reviewDate }: Props) {
	return (
		<div className="group flex items-start space-x-2 even:flex-row-reverse even:space-x-reverse">
			<div className="w-8 h-8 rounded-full bg-slate-300" />
			<div className=' w-1/2'>
				<span className='block w-full text-left group-even:text-right text-xs font-bold'>{userName}</span>
				<div className="mt-2 mb-1 text-sm bg-oddComment group-even:bg-evenComment text-gray-700 p-2 border border-gray-300 rounded-md">
					<p className='line-clamp-3'>{review}</p>
				</div>
				<span className='block w-full text-left group-even:text-right text-[10px] text-gray-500'>{reviewDate}</span>
			</div>
		</div>
	)
}

export default Message