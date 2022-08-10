import MobileLayout from '@components/layout/MobileLayout'
import { useQuery } from '@tanstack/react-query'
import { SIDO_ARR } from '@utils/constants'
import { useMemo, useState, useEffect } from 'react'
import { getBeach } from '@utils/openApi'
import { cls } from '@utils/index'
import { useRouter } from 'next/router'
import Button from '@components/layout/Button'
import Loader from '@components/Loader'


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
			<div className='mx-auto w-80'>
				<div className='flex outline outline-gray-200 mb-10'>
					<aside className="w-2/5" aria-label="Sidebar">
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
					<aside className="relative w-3/5 overflow-y-auto max-h-[500px]" aria-label="Sidebar">
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
						{isLoading && <Loader />}
					</aside>
				</div>
				<Button onClick={hanldeClick}>검색</Button>
			</div>
		</MobileLayout>
	)
}

export default searchBySido