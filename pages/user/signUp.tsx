import React from 'react'
import MobileLayout from '@components/layout/MobileLayout'
import { cls } from '@utils/index'
import Link from 'next/link'
import Button from '@components/layout/Button'
function signUp() {
	const isError = true

	return (
		<MobileLayout isGoBack={false}>
			<div className='flex flex-col items-center gap-3'>
				<h2 className='text-3xl font-bold'>회원가입</h2>
				<form className='min-w-[500px] flex flex-col gap-3'>
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
						<div className="relative">
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
							</div>
							<input type="text" id="email" className={cls("outline-none bg-gray-50 text-gray-900 text-sm rounded-lg  focus:border-primary border-2 block w-full pl-10 p-2.5 ", isError ? 'border-red-500' : 'border-gray-300')} placeholder="abcde@naver.com" />
						</div>
						{/* <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oh, snapp!</span> Some error message.</p> */}
					</div>
					<div>
						<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
						<div className="flex">
							<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
								@
							</span>
							<input type="text" id="username" className={cls("outline-none rounded-r-lg bg-gray-50  text-gray-900 focus:border-primary border-2 block flex-1 min-w-0 w-full text-sm p-2.5 ", isError ? 'border-red-500' : 'border-gray-300')} placeholder="elonmusk" />
						</div>
						{/* <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oh, snapp!</span> Some error message.</p> */}
					</div>
					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
						<input type="password" id="password" className={cls("outline-none bg-gray-50 text-gray-900 text-sm rounded-lg focus:border-primary border-2 block w-full p-2.5 ", isError ? 'border-red-500' : 'border-gray-300')} placeholder="•••••••••" />
						{/* <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oh, snapp!</span> Some error message.</p> */}
					</div>
					<div>
						<label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
						<input type="password" id="confirm_password" className={cls("outline-none bg-gray-50 text-gray-900 text-sm rounded-lg focus:border-primary border-2 block w-full p-2.5 ", isError ? 'border-red-500' : 'border-gray-300')} placeholder="•••••••••" />
						{/* <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oh, snapp!</span> Some error message.</p> */}
					</div>
					<Link href='/user/logIn'>
						<a className="my-4 text-sm text-primary hover:underline text-right">로그인 하기</a>
					</Link>
					<Button onClick={() => alert()}>가입</Button>
				</form>
			</div>
		</MobileLayout>
	)
}

export default signUp