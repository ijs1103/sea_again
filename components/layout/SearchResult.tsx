import React from 'react'
interface Props {
	keyword: string
}
function SearchResult({ keyword }: Props) {
	return (
		<div className='absolute top-4 left-1/2 -translate-x-1/2  bg-white shadow-2xl rounded-2xl p-3'>
			<span className='text-sm text-searchResult'><strong className='text-primary'>{keyword}</strong> 검색결과</span>
		</div>
	)
}

export default SearchResult