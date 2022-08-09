import React, { useState } from 'react'
import { cls } from '@utils/index'
interface Props {
	keyword: string
}
function SearchResult({ keyword }: Props) {
	const [isClicked, setIsCliked] = useState(false)
	return (
		<div onClick={() => setIsCliked(true)} className={cls('animate-bounce cursor-pointer absolute top-4 left-1/2 -translate-x-1/2  bg-white shadow-2xl rounded-2xl p-3 ', isClicked ? 'hidden pointer-events-none' : 'block')}>
			<span className='text-sm text-searchResult'><strong className='text-primary'>{keyword}</strong> 검색결과</span>
		</div>
	)
}

export default SearchResult