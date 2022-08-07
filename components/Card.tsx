import Image from 'next/image'
import React from 'react'
import { BeachResponse } from '@utils/interfaces'

function Card(beachInfo: BeachResponse) {
	const { beach_img, sido_nm, gugun_nm, sta_nm, link_addr, link_tel, } = beachInfo
	//() => handleCardClick(+beach?.lat, +beach?.lon)
	return (
		<div onClick={ } className='bg-white shadow-2xl p-2 rounded-2xl w-[350] h-[370]'>
			{beach_img ? <Image src={beach_img} alt='beach_img' width={300} height={200} /> : <div className='bg-gray-500 w-[300] h-[200]'></div>}
			<div className='flex justify-between'>
				<div>
					<span>{sta_nm}</span>
					<span>{sido_nm} {gugun_nm}</span>
				</div>
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
			</div>
			<div className='flex justify-end'>
				<span className='bg-primary hover:brightness-75 text-[10px]'>더보기</span>
			</div>
		</div>
	)
}

export default Card