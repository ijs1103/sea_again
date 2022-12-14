import { cls } from "@utils/index"

interface Props {
	type: "search" | "liked" | "topTen"
	keyword: string
	isActive?: boolean
}
function SearchResult({ type, keyword, isActive = true }: Props) {
	return (
		<div className={cls(' left-0 right-0 p-3 mx-auto bg-white shadow-2xl cursor-pointer pointer-events-none animate-bounce hover:brightness-75 top-4 w-max rounded-2xl ', isActive ? 'absolute' : 'hidden')}>
			{type === 'topTen' && <span className='text-sm text-searchResult'><strong className='text-primary'>{keyword}</strong></span>}
			{type === 'search' && <span className='text-sm text-searchResult'><strong className='text-primary'>{keyword}</strong> 검색결과</span>}
			{type === 'liked' && <span className='text-sm font-bold text-searchResult'><strong className='text-red-500'>{keyword}개의 </strong>찜 해수욕장</span>}
		</div>
	)
}

export default SearchResult