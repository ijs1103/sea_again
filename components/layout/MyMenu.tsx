import { cls } from '@utils/index'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useAuth from '@hooks/useAuth'
import useLogout from '@hooks/useQueries/useLogout'

function MyMenu() {
	const router = useRouter()
	const { profile, isLogin } = useAuth('getProfile')
	const { logOut } = useLogout()
	const [isActive, setActive] = useState(false)
	const toggleDropDown = () => setActive((prev: boolean) => !prev)
	const handleLogInOutClick = async () => {
		if (isLogin) {
			// httpOnly가 적용된 쿠키라 클라이언트에선 삭제 불가능, 서버에 쿠키 삭제 요청 
			logOut()
		} else {
			router.push('/user/logIn')
		}
	}
	const handleLikedBeachClick = () => { window.location.href = `/map/?userId=${profile?.id}` }
	return (
		<div className='absolute left-0 mt-4 ml-4 cursor-pointer'>
			<button type='button' onClick={toggleDropDown} className='p-2 transition-all rounded-full bg-primary hover:brightness-75'>
				<span className="sr-only">Open my menu</span>
				<svg className="w-6 h-6 text-white " stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
			</button>
			<div className={cls("absolute top-12 z-10 w-44 bg-white rounded-2xl divide-y divide-gray-200 shadow-2xl overflow-hidden ", isActive ? 'block' : 'hidden')}>
				<div className="px-4 py-3 text-sm text-gray-900">
					{isLogin ? <>
						<span className='text-primary'>{profile?.name}</span>
						<span className="block font-medium truncate text-fontPrimary">{profile?.email}</span>
					</> : <span className='text-primary'>반갑습니다 익명님</span>
					}

				</div>
				<ul className={cls("bg-white py-1 text-sm text-gray-700 ", !isLogin ? "pointer-events-none opacity-30" : "")} aria-labelledby="dropdownUserAvatarButton">
					<li className='transition hover:bg-gray-100'>
						<Link href={'/user/profile'}>
							<a className="block px-4 py-2">프로필 수정</a>
						</Link>
					</li>
					<li className='transition hover:bg-gray-100'>
						<a onClick={handleLikedBeachClick} className="block px-4 py-2">찜 해수욕장 보기</a>
					</li>
				</ul>
				<div onClick={handleLogInOutClick} className="py-1 transition hover:bg-gray-100">
					<span className="block px-4 py-2 text-sm text-gray-700 ">{isLogin ? '로그아웃' : '로그인'}</span>
				</div>
			</div>
			{/* 투명 오버레이 => dropDown 메뉴를 토글하기 위함 */}
			<div onClick={toggleDropDown} className={cls('z-0 fixed top-0 left-0 w-full h-full ', isActive ? 'block' : 'hidden')}></div>
		</div>
	)
}

export default MyMenu

