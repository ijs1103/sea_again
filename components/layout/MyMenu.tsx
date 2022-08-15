import { cls } from '@utils/index'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ResponseType } from '@utils/interfaces'
import { userLogOut } from '@utils/axiosFunctions/ownApi'
import Link from 'next/link'
import useAuth from '@hooks/useAuth'


function MyMenu() {
	const router = useRouter()
	const { profile, isLogin } = useAuth('getProfile')
	const { mutate: logOutMutate, isLoading, isSuccess, isError, error } = useMutation<ResponseType, AxiosError>(userLogOut, {
		onSuccess: ({ data }) => {
			if (data.ok) {
				alert('로그아웃 되었습니다!')
				document.location.href = "/map"
			} else {
				alert(data.error)
			}
		},
		onError: (error) => console.log('axios 에러 : ', error)
	})
	const [isActive, setActive] = useState(false)
	const toggleDropDown = useCallback(() => setActive((prev: any) => !prev), [])
	const handleLogInOutClick = async () => {
		if (isLogin) {
			// httpOnly가 적용된 쿠키라 클라이언트에선 삭제 불가능, 서버에 쿠키 삭제 요청 
			logOutMutate()
		} else {
			router.push('/user/logIn')
		}
	}
	return (
		<div className='cursor-pointer absolute left-0 mt-4 ml-4'>
			<button type='button' onClick={toggleDropDown} className='rounded-full bg-primary hover:brightness-75 transition-all p-2'>
				<span className="sr-only">Open my menu</span>
				<svg className="w-6 h-6 text-white " stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
			</button>
			<div className={cls("absolute top-12 z-10 w-44 bg-white rounded-2xl divide-y divide-gray-200 shadow-2xl overflow-hidden ", isActive ? 'block' : 'hidden')}>
				<div className="py-3 px-4 text-sm text-gray-900">
					{isLogin ? <>
						<span className='text-primary'>{profile?.name}</span>
						<span className="text-fontPrimary block font-medium truncate">{profile?.email}</span>
					</> : <span className='text-primary'>반갑습니다 익명님</span>
					}

				</div>
				<ul className={cls("bg-white py-1 text-sm text-gray-700 ", !isLogin ? "pointer-events-none opacity-30" : "")} aria-labelledby="dropdownUserAvatarButton">
					<li className='transition hover:bg-gray-100'>
						<Link href={'/user/profile'}>
							<a className="block py-2 px-4">프로필 수정</a>
						</Link>
					</li>
					<li className='transition hover:bg-gray-100'>
						<Link href={`/user/likedBeach/${profile?.id}`}>
							<a className="block py-2 px-4">찜 해수욕장 보기</a>
						</Link>
					</li>
				</ul>
				<div onClick={handleLogInOutClick} className="transition py-1 hover:bg-gray-100">
					<span className="block py-2 px-4 text-sm text-gray-700 ">{isLogin ? '로그아웃' : '로그인'}</span>
				</div>
			</div>
			{/* 투명 오버레이 => dropDown 메뉴를 토글하기 위함 */}
			<div onClick={toggleDropDown} className={cls('z-0 fixed top-0 left-0 w-full h-full ', isActive ? 'block' : 'hidden')}></div>
		</div>
	)
}

export default MyMenu