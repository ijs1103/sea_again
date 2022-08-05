import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function App() {
	return (
		<div className='h-screen'>
			<div className='fixed left-0 top-0 w-full h-full bg-[url("/beach_main.webp")] bg-cover bg-no-repeat blur-sm'>
			</div>
			<div className='fixed left-0 top-0 w-full h-full max-w-4xl mx-auto flex flex-col justify-between items-center pb-16'>
				<div className='select-none'>
					<Image src={'/seaagain_logo.png'} width={800} height={400} alt='logo' />
					<h2 className="text-center text-4xl font-['Jeju_Hallasan'] text-white">안전한 해수욕장은 어디일까?</h2>
					<span className='block mt-4 font-bold text-sm text-right text-gray-700'>매시간 해수욕장 날씨가 업데이트 됩니다</span>
				</div>
				<Link href='/search'>
					<a>
						<button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">시작하기</button>
					</a>
				</Link>
			</div>
		</div>


	)
}

export default App