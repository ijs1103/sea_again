import Link from 'next/link'
import React from 'react'


function SearchBar() {
	return (
		<Link href={'/searchBySido'}>
			<a className='block absolute right-0 mt-4 mr-4 w-60'>
				<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
				<div className="relative">
					<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg aria-hidden="true" className="w-5 h-5 text-primary " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
					</div>
					<input type="search" id="default-search" className="outline-none block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 shadow-2xl rounded-2xl" placeholder="해수욕장 찾기" readOnly />
				</div>
			</a>
		</Link>
	)
}

export default SearchBar