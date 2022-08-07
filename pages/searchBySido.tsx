import MobileLayout from '@components/layout/MobileLayout'
import { useQuery } from '@tanstack/react-query'
import { SIDO_ARR } from '@utils/constants'
import { useMemo, useState, useEffect } from 'react'
import { getBeach } from './api/openApi'
import { cls } from '@utils/index'
import { useRouter } from 'next/router'
import Button from '@components/layout/Button'


function searchBySido() {
	const router = useRouter()
	const [curSido, setCurSido] = useState('인천')
	const [beach, setBeach] = useState('')
	const { data, isLoading, error } = useQuery<any>(['beach', curSido], () => getBeach(curSido))
	const hanldeClick = () => {
		// 라디오 버튼 체크된 값에 해당되는 해수욕장 객체 데이터를 next/router의 query 속성에 저장하여 넘긴다 
		router.push({ pathname: '/map', query: { data: beach } })
	}
	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.dataset.beach && setBeach(e.target.dataset.beach)
	}
	return (
		<MobileLayout isGoBack={true}>
			<div className='flex flex-col items-center'>
				<div className='flex outline outline-gray-200 mb-10'>
					<aside className="w-32" aria-label="Sidebar">
						<div className="bg-[#EBEBEB] text-[#757575]">
							<ul >
								{SIDO_ARR.map((sido, idx) =>
								(<li onClick={() => setCurSido(sido)} key={idx} className={cls('hover:bg-white ', sido === curSido ? 'bg-white' : '')}>
									<a className="flex items-center p-2 text-base font-normal rounded-lg">
										<span className="ml-3">{sido}</span>
									</a>
								</li>))
								}
							</ul>
						</div>
					</aside>
					<aside className="relative w-48 overflow-y-auto max-h-[500px]" aria-label="Sidebar">
						<div className="px-6 py-6 ">
							<ul className=" font-medium text-xs text-[#161616] bg-white">
								{!isLoading && data?.map(beach =>
									<li key={beach.num} className="w-full rounded-t-lg">
										<div className="flex items-center pl-3">
											<input id={beach.num} type="radio" data-beach={JSON.stringify(beach)} value={beach.num} onChange={handleRadioChange} name="list-beach" className="w-4 h-4 text-blue-600 bg-[primary] border-gray-300 focus:ring-blue-500" />
											<label htmlFor={beach.num} className="select-none py-3 ml-2 w-full">{beach.sta_nm}</label>
										</div>
									</li>
								)}
							</ul>
						</div>
						{/* spinner */}
						{isLoading && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
							<div role="status">
								<svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
									<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
								</svg>
								<span className="sr-only">Loading...</span>
							</div>
						</div>}
					</aside>
				</div>
				<Button onClick={hanldeClick}>검색</Button>
			</div>
		</MobileLayout>
	)
}

export default searchBySido