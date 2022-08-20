import Link from 'next/link'
import React from 'react'


function SearchBar() {
	return (
		<Link href={'/searchBySido'}>
			<a className='absolute block w-max sm:w-40 top-4 right-4'>
				<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
				<div className="relative p-4 rounded-full shadow-2xl bg-gray-50 sm:bg-transparent sm:shadow-none sm:p-0">
					<div className="absolute inset-y-0 flex items-center -translate-x-1/2 -translate-y-1/2 pointer-events-none sm:translate-x-0 sm:translate-y-0 left-1/2 top-1/2 sm:left-0 sm:top-0 sm:pl-3">
						<svg aria-hidden="true" className="w-5 h-5 text-primary " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
					</div>
					<input type="search" id="default-search" className="hidden w-full p-3 pl-10 text-sm text-gray-900 shadow-2xl outline-none cursor-pointer sm:block bg-gray-50 rounded-2xl" placeholder="해수욕장 찾기" readOnly />
				</div>
			</a>
		</Link>
	)
}

export default SearchBar