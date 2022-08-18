import React, { useState } from 'react'
import { cls } from '@utils/index'
interface Props {
	type: "search" | "liked"
	keyword: string
}
function SearchResult({ type, keyword }: Props) {
	const [isClicked, setIsCliked] = useState(false)
	return (
		<div onClick={() => setIsCliked(true)} className={cls('animate-bounce hover:brightness-75 cursor-pointer fixed top-4 left-1/2 -translate-x-1/2  bg-white shadow-2xl rounded-2xl p-3 ', isClicked ? 'hidden pointer-events-none' : 'block')}>
			{type === 'search' && <span className='text-sm text-searchResult'><strong className='text-primary'>{keyword}</strong> 검색결과</span>}
			{type === 'liked' && <span className='text-sm font-bold text-searchResult'><strong className='text-red-500'>{keyword}개의 </strong>찜 해수욕장</span>}
		</div>
	)
}


export default SearchResult