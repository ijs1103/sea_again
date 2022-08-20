import { cls, extractOnlyPhoneNum, getRandomSrc } from '@utils/index'
import { BeachResponse } from '@utils/interfaces'
import Image from 'next/image'
import { useCallback, useState, memo, useMemo } from 'react'
import { TabType } from '@utils/interfaces'
import { TAB_ARR, BLUR_DATA_URL } from '@utils/constants'
import Weather from '@components/tabmenu/Weather'
import WaterQuality from '@components/tabmenu/WaterQuality'
import Sand from '@components/tabmenu/Sand'
import Comment from '@components/tabmenu/Comment'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ResponseType } from '@utils/interfaces'
import { toggleLikeFetcher, getBeachByName } from '@utils/fetchers/ownApi'
import { Beach } from '@prisma/client'
import useAuth from '@hooks/useAuth'
import { RWebShare } from "react-web-share"

interface Props {
	onModalClose: () => void
	beachData: BeachResponse | undefined
}

const Modal = ({ onModalClose, beachData }: Props) => {
	const { isLogin } = useAuth('getProfile')
	const queryClient = useQueryClient()
	const { beach_img, sido_nm, gugun_nm, sta_nm, link_addr, link_tel, beach_knd, lat, lon } = beachData
	const [currentTab, setCurrentTab] = useState<TabType>('날씨')
	const { data } = useQuery<any>(['beachByName', `${gugun_nm} ${sta_nm}`], () => getBeachByName(`${gugun_nm} ${sta_nm}`))
	const { mutate: toggleLike } = useMutation<ResponseType, AxiosError, string>(toggleLikeFetcher)
	console.log(data)
	const handleLikeclick = useCallback(() => {
		// 로그인을 한 상태가 아니라면 좋아요 로직이 실행되지 않도록 
		if (!isLogin) return
		toggleLike(`${gugun_nm} ${sta_nm}`)
		queryClient.setQueryData(['beachByName', `${gugun_nm} ${sta_nm}`], (prev: any) => { return { ...prev, isLiked: !prev?.isLiked } })
	}, [])
	// 랜덤 생성한 이미지 src를 memoization
	const randomSrc = useMemo(getRandomSrc, [])

	return (
		<>
			<div onClick={() => onModalClose()} className='fixed top-0 w-full h-full bg-black opacity-60'></div>
			<div className="fixed -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl top-1/2 left-1/2">
				<div className="w-[340px] sm:w-full px-4 py-2 rounded-lg">
					<div className='flex flex-col items-center gap-3'>
						<div className='overflow-hidden rounded-xl relative w-full h-[80px] sm:w-[500px] sm:h-[100px]'>
							<Image sizes='(min-width: 640px) 500px, 250px' loading='eager' className='object-cover' blurDataURL={BLUR_DATA_URL} placeholder='blur' src={randomSrc} layout="fill" alt={beach_img} />
						</div>
						<div className='flex items-center justify-between w-full'>
							<RWebShare data={{ text: `${sido_nm} ${gugun_nm}에 위치 하고 있습니다`, url: link_addr, title: `${sta_nm} 해수욕장` }} onClick={() => console.log('공유 하기 버튼 클릭')}>
								<svg className='w-6 h-6 cursor-pointer sm:w-8 sm:h-8 fill-modalPrimary' viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M32.9219 7.12299C32.7366 6.94927 32.5046 6.83353 32.2544 6.79001C32.0041 6.74649 31.7467 6.7771 31.5136 6.87807C31.2806 6.97903 31.0821 7.14595 30.9428 7.35826C30.8034 7.57058 30.7291 7.81901 30.7292 8.07299V13.773C30.3562 13.7813 29.9219 13.8042 29.4375 13.848C27.8385 13.9959 25.6708 14.3959 23.4208 15.4157C18.8354 17.4938 14.1229 22.0553 13.0292 31.624C12.9994 31.886 13.0498 32.1508 13.1738 32.3835C13.2978 32.6161 13.4895 32.8057 13.7235 32.927C13.9575 33.0484 14.2229 33.0959 14.4845 33.0632C14.7461 33.0304 14.9916 32.9191 15.1885 32.7438C19.7042 28.7292 23.9354 27.0011 26.9969 26.2657C28.1871 25.9729 29.4035 25.7995 30.6281 25.748L30.7292 25.7449V31.5105C30.7291 31.7645 30.8034 32.0129 30.9428 32.2252C31.0821 32.4375 31.2806 32.6044 31.5136 32.7054C31.7467 32.8064 32.0041 32.837 32.2544 32.7935C32.5046 32.75 32.7366 32.6342 32.9219 32.4605L45.4219 20.7417C45.5518 20.62 45.6554 20.4728 45.7262 20.3094C45.797 20.146 45.8335 19.9698 45.8335 19.7917C45.8335 19.6137 45.797 19.4375 45.7262 19.2741C45.6554 19.1107 45.5518 18.9635 45.4219 18.8417L32.9219 7.12299V7.12299ZM6.25 14.8438C6.25 13.1172 6.93592 11.4612 8.15686 10.2403C9.3778 9.01932 11.0337 8.33341 12.7604 8.33341H21.3542C21.6995 8.33341 22.0307 8.47059 22.2749 8.71478C22.5191 8.95897 22.6562 9.29016 22.6562 9.63549C22.6562 9.98082 22.5191 10.312 22.2749 10.5562C22.0307 10.8004 21.6995 10.9376 21.3542 10.9376H12.7604C11.7244 10.9376 10.7308 11.3491 9.99828 12.0817C9.26572 12.8143 8.85417 13.8078 8.85417 14.8438V37.2397C8.85417 38.2757 9.26572 39.2692 9.99828 40.0018C10.7308 40.7344 11.7244 41.1459 12.7604 41.1459H35.1562C36.1923 41.1459 37.1858 40.7344 37.9184 40.0018C38.6509 39.2692 39.0625 38.2757 39.0625 37.2397V34.8959C39.0625 34.5506 39.1997 34.2194 39.4439 33.9752C39.6881 33.731 40.0192 33.5938 40.3646 33.5938C40.7099 33.5938 41.0411 33.731 41.2853 33.9752C41.5295 34.2194 41.6667 34.5506 41.6667 34.8959V37.2397C41.6667 38.9663 40.9807 40.6223 39.7598 41.8432C38.5389 43.0642 36.8829 43.7501 35.1562 43.7501H12.7604C11.0337 43.7501 9.3778 43.0642 8.15686 41.8432C6.93592 40.6223 6.25 38.9663 6.25 37.2397V14.8438Z" fill="#5E17EB" />
								</svg>
							</RWebShare>
							<div className='text-center'>
								<h3 className='text-lg font-bold sm:text-xl text-fontPrimary'>{sta_nm}</h3>
								<span className='text-xs text-fontSecondary'>{sido_nm} {gugun_nm}</span>
							</div>
							<div className='flex flex-col items-center'>
								<svg onClick={handleLikeclick} className={cls("w-6 h-6 cursor-pointer sm:w-8 sm:h-8 text-red-500 ", data?.isLiked ? "fill-red-500" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
								<span className='text-xs text-red-400'>{data?.beach?._count?.likes ? '+' : ''}{data?.beach?._count?.likes}</span>
							</div>
						</div>
						<ul className='w-[400px] flex justify-center text-center'>
							<li className='flex-1'>
								<span className='modal-info'>특징</span>
								<span className={cls('text-xs ', beach_knd ? 'text-blue-500' : 'text-fontSecondary')}>{beach_knd ? beach_knd : '없음'}</span>
							</li>
							<li className='flex-1'>
								<span className='modal-info'>연락처</span>
								<span className={cls('text-xs ', link_tel ? 'text-blue-500' : 'text-fontSecondary')}>{link_tel ? extractOnlyPhoneNum(link_tel) : '없음'}</span>
							</li>
							<li className='flex-1'>
								<span className='modal-info'>홈페이지</span>
								<a onClick={e => !link_addr && e.preventDefault()} href={link_addr} target="_blank" rel="noopener noreferrer">
									<span className={cls('text-xs ', link_addr ? 'text-blue-500 hover:underline' : 'text-fontSecondary')}>
										{link_addr ? '링크' : '없음'}
									</span>
								</a>
							</li>
						</ul>
						<div className='w-full bg-modalPrimary rounded-3xl'>
							<ul className='flex justify-center px-6 py-2'>
								{TAB_ARR.map((tabName, idx) => <li key={idx} onClick={() => setCurrentTab(tabName)} className={cls('flex-1 py-1 text-center rounded-xl text-[12px] ', currentTab === tabName ? 'bg-white text-fontPrimary shadow-2xl' : 'bg-transparent text-white')}>
									<span>{tabName}</span>
								</li>)}
							</ul>
						</div>
						<div className='h-[200px] w-full'>
							{currentTab === '날씨' && <Weather {...{ lat, lon }} />}
							{currentTab === '수질' && <WaterQuality {...{ sido_nm, sta_nm }} />}
							{currentTab === '모래' && <Sand {...{ sido_nm, sta_nm }} />}
							{currentTab === '후기' && <Comment {...{ beachName: `${gugun_nm} ${sta_nm}` }} />}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(Modal)