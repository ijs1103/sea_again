import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
function App() {
	return (
		<div className='w-full h-screen'>
			<div className='fixed top-0 left-0 w-full h-full blur-sm'>
				<Image className='object-cover' src={'/beach_main.webp'} layout="fill" priority alt='beach_main' loading='eager' />
			</div>
			<div className='fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-between h-full max-w-4xl pb-16 mx-auto'>
				<div className='mt-10 select-none sm:mt-0'>
					<Image src={'/seaagain_logo.png'} width={800} height={400} alt='logo' />
					<h2 className="text-center text-xl sm:text-4xl font-['Jeju_Hallasan'] text-white">안전한 해수욕장은 어디일까?</h2>
					<span className='block mt-4 text-xs font-bold text-center text-gray-700 sm:text-sm sm:text-right'>매시간 해수욕장 날씨가 업데이트 됩니다</span>
				</div>
				<Link href='/map'>
					<a>
						<button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 sm:px-5 sm:py-2.5 mr-2 mb-2">시작하기</button>
					</a>
				</Link>
			</div>
		</div>


	)
}

export default App