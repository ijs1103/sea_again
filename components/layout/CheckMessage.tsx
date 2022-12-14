import React from 'react'
import { CheckResponse } from '@utils/interfaces'

function CheckMessage(data: CheckResponse) {
	return (
		<>
			{data?.message && <span className='text-xl text-gray-700'>{data?.message}</span>}
			{data?.ok ? <><svg className='w-12 h-12' viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M30 56.25C44.4975 56.25 56.25 44.4975 56.25 30C56.25 15.5025 44.4975 3.75 30 3.75C15.5025 3.75 3.75 15.5025 3.75 30C3.75 44.4975 15.5025 56.25 30 56.25Z" fill="#4CAF50" />
				<path d="M43.25 18.25L26.25 35.25L19.25 28.25L15.75 31.75L26.25 42.25L46.75 21.75L43.25 18.25Z" fill="#CCFF90" />
			</svg>
				<span className='mt-3 text-2xl text-safe'>적합</span>
				<span className='absolute text-gray-500 text-[12px] font-bold bottom-2 right-0'>조사일자: {data?.testDate}</span></>
				: !data?.message && <><svg className='w-12 h-12' viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M23 0.5C10.625 0.5 0.5 10.625 0.5 23C0.5 35.375 10.625 45.5 23 45.5C35.375 45.5 45.5 35.375 45.5 23C45.5 10.625 35.375 0.5 23 0.5ZM23 5.5C26.875 5.5 30.5 6.875 33.5 9L9 33.5C6.875 30.5 5.5 26.875 5.5 23C5.5 13.375 13.375 5.5 23 5.5ZM23 40.5C19.125 40.5 15.5 39.125 12.5 37L37 12.5C39.125 15.5 40.5 19.125 40.5 23C40.5 32.625 32.625 40.5 23 40.5Z" fill="#D50000" />
				</svg>
					<span className='mt-3 text-2xl text-danger'>부적합</span>
					<span className='absolute text-gray-500 text-[12px] font-bold bottom-2 right-0'>조사일자: {data?.testDate}</span></>
			}
		</>
	)
}

export default CheckMessage