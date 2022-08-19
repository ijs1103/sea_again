import { cls } from '@utils/index'

interface Props {
	limit: number
	page: number
	setPage: (page: number) => void
	isEmpty: boolean
}
function Pagination({ limit, page, setPage, isEmpty }: Props) {

	return (
		<nav className='' aria-label="Page navigation">
			<ul className="inline-flex items-center justify-center w-full -space-x-px">
				<li>
					<button onClick={() => setPage(page - 1)} disabled={page === 1 || isEmpty} className="block px-2 py-1 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
						<span className="sr-only">Previous</span>
						<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
					</button>
				</li>
				{Array.from({ length: limit }).map((_, idx) =>
					<li key={idx + 1}>
						<button onClick={() => setPage(idx + 1)} className={cls("py-1 px-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ", page === (idx + 1) ? "bg-gray-200" : "")}>{idx + 1}</button>
					</li>
				)}
				<li>
					<button onClick={() => setPage(page + 1)} disabled={page === limit || isEmpty} className="block px-2 py-1 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
						<span className="sr-only">Next</span>
						<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
					</button>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination