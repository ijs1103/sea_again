import { cls } from '@utils/index'
import Link from 'next/link'
import { useState } from 'react'

function MyMenu() {
	const [isActive, setActive] = useState(false)
	const isLogin = false
	const toggleDropDown = () => setActive((prev: any) => !prev)
	return (
		<div className='cursor-pointer absolute left-0 mt-4 ml-4'>
			<button type='button' onClick={toggleDropDown} className='rounded-full bg-primary hover:brightness-75 transition-all p-2'>
				<span className="sr-only">Open my menu</span>
				<svg className="w-6 h-6 text-white " stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
			</button>
			<div id="dropdownAvatar" className={cls("absolute top-12 z-10 w-44 bg-white rounded-2xl divide-y divide-gray-200 shadow-2xl overflow-hidden ", isActive ? 'block' : 'hidden')}>
				<div className="py-3 px-4 text-sm text-gray-900">
					{isLogin ? <>
						<span className='text-primary'>Bonnie Green</span>
						<span className="text-fontPrimary block font-medium truncate">name@flowbite.com</span>
					</> : <span className='text-primary'>반갑습니다 익명님</span>
					}

				</div>
				<ul className={cls("bg-white py-1 text-sm text-gray-700 ", !isLogin && "pointer-events-none opacity-30")} aria-labelledby="dropdownUserAvatarButton">
					<li className='transition hover:bg-gray-100'>
						<a className="block py-2 px-4">프로필 수정</a>
					</li>
					<li className='transition hover:bg-gray-100'>
						<a className="block py-2 px-4">찜 해수욕장 보기</a>
					</li>
				</ul>
				<div className="transition py-1 hover:bg-gray-100">
					<Link href={isLogin ? '/api/user/logOut' : '/user/logIn'}>
						<a className="block py-2 px-4 text-sm text-gray-700 ">{isLogin ? '로그아웃' : '로그인'}</a>
					</Link>
				</div>
			</div>
			<div onClick={toggleDropDown} className={cls('z-0 fixed top-0 left-0 w-full h-full ', isActive ? 'block' : 'hidden')}></div>
		</div>
	)
}

export default MyMenu