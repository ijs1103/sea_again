import Link from 'next/link'
import React from 'react'

function NotFound() {
	return (
		<div
			className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-primary to-white"
		>
			<div className="px-40 py-20 bg-white rounded-md shadow-xl">
				<div className="flex flex-col items-center">
					<h1 className="font-bold text-primary text-9xl">404</h1>

					<h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
						<span className="text-red-400">Oops!</span> Page not found
					</h6>

					<p className="mb-8 text-center text-fontPrimary md:text-lg">
						찾으시려는 페이지가 존재하지 않습니다
					</p>

					<Link href={'/'}>
						<a className="px-6 py-2 text-sm font-semibold bg-purple-100 text-primary rounded-2xl">홈으로</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound