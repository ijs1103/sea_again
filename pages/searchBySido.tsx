import MobileLayout from '@components/layout/MobileLayout'
import { SIDO_ARR } from '@utils/constants'
import { useState } from 'react'
import { cls } from '@utils/index'
import { useRouter } from 'next/router'
import Button from '@components/layout/Button'
import Loader from '@components/Loader'
import { useAppDispatch } from "@store/index"
import { setSearched } from '@store/slice/beachSlice'
import useBeachBySido from '@hooks/useQueries/useBeachBySido'

function SearchBySido() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const [curSido, setCurSido] = useState('인천')
	const [isRadioSelected, setIsRadioSelected] = useState(false)
	const { beachs, isLoading } = useBeachBySido(curSido)
	const hanldeClick = () => router.push('/map')
	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.dataset.beach) return
		dispatch(setSearched(JSON.parse(e.target.dataset.beach)))
		!isRadioSelected && setIsRadioSelected(true)
	}
	return (
		<MobileLayout isGoBack={true}>
			<div className='mx-auto w-50 sm:w-80'>
				<div className='flex flex-col justify-between gap-4'>
					<h2 className='text-xl font-bold text-center select-none sm:text-2xl sm:text-left text-fontPrimary'>시도별 해수욕장 검색</h2>
					<div className='flex outline outline-gray-200'>
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
									{!isLoading && beachs?.map(beach =>
										<li key={beach.num} className="w-full rounded-t-lg">
											<div className="flex items-center pl-3">
												<input id={beach.num + ""} type="radio" data-beach={JSON.stringify(beach)} value={beach.num} onChange={handleRadioChange} name="list-beach" className="w-4 h-4 text-blue-600 bg-[primary] border-gray-300 focus:ring-blue-500" />
												<label htmlFor={beach.num + ""} className="w-full py-3 ml-2 select-none">{beach.sta_nm}</label>
											</div>
										</li>
									)}
								</ul>
							</div>
							{isLoading && <Loader />}
						</aside>
					</div>
					<Button disabled={!isRadioSelected} onClick={hanldeClick}>검색</Button>
				</div>
			</div>

		</MobileLayout>
	)
}

export default SearchBySido