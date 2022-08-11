import React from 'react'
import MobileLayout from '@components/layout/MobileLayout'
import FormLayout from '@components/layout/FormLayout'
import Link from 'next/link'
import Button from '@components/layout/Button'
import { useForm } from 'react-hook-form'
import FormInput from '@components/FormInput'
import { LoginForm } from '@utils/interfaces'
import {
	FORM_ERR_MSG,
	PW_REGEX,
	EMAIL_REGEX,
} from '@utils/constants'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { userLogIn } from '@utils/axiosFunctions/ownApi'
import { useRouter } from 'next/router'

function LogIn() {
	const router = useRouter()
	const { register, handleSubmit, formState } =
		useForm<LoginForm>({ mode: "onChange" })
	const { mutate: loginMutate, isLoading, isSuccess, isError, error } = useMutation<ResponseType, AxiosError, LoginForm>(userLogIn, {
		onSuccess: ({ data }) => {
			if (data.ok) {
				alert('로그인 성공!!')
				router.push('/')
			} else {
				alert(data.error)
			}
		},
		onError: (error) => console.log('axios 에러 : ', error)
	})
	const onValid = (form: LoginForm) => {
		//login 로직
		loginMutate({ ...form })
	}
	return (
		<MobileLayout isGoBack={false}>
			<FormLayout label='로그인'>
				<form onSubmit={handleSubmit(onValid)} className='min-w-[500px] flex flex-col gap-3'>
					<FormInput id={'email'} register={register("email", { required: true, pattern: { value: EMAIL_REGEX, message: FORM_ERR_MSG.invalidEmail } })} errorMsg={formState.errors['email']?.message} />
					<FormInput id={'password'} register={register("password", { required: true, pattern: { value: PW_REGEX, message: FORM_ERR_MSG.invalidPw } })} errorMsg={formState.errors['password']?.message} />
					<div className="my-4 flex justify-between items-center text-sm">
						<div className='flex items-center'>
							<input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300" />
							<label htmlFor="remember" className="ml-2 font-medium text-gray-400">로그인 유지</label>
						</div>
						<Link href='/user/signUp'>
							<a className=" text-primary hover:underline">회원가입 하기</a>
						</Link>
					</div>
					<Button>로그인</Button>
				</form>
			</FormLayout>
		</MobileLayout>
	)
}

export default LogIn