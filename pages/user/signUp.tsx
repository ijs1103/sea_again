import React from 'react'
import MobileLayout from '@components/layout/MobileLayout'
import FormLayout from '@components/layout/FormLayout'
import Link from 'next/link'
import Button from '@components/layout/Button'
import { useForm } from 'react-hook-form'
import FormInput from '@components/FormInput'
import { SignUpForm } from '@utils/interfaces'
import {
	FORM_ERR_MSG, NAME_REGEX,
	PW_REGEX,
	EMAIL_REGEX,
} from '@utils/constants'
import useSignup from '@hooks/useQueries/useSignup'


function SignUp() {
	const { register, handleSubmit, formState, getValues } =
		useForm<SignUpForm>({ mode: "onChange" })
	const { signUp } = useSignup()
	const onValid = (form: SignUpForm) => {
		signUp({ ...form })
	}
	return (
		<MobileLayout isGoBack={false}>
			<FormLayout label='회원가입'>
				<form onSubmit={handleSubmit(onValid)} className='form-layout'>
					<FormInput id={'email'} register={register("email", { required: FORM_ERR_MSG.required, pattern: { value: EMAIL_REGEX, message: FORM_ERR_MSG.invalidEmail } })} errorMsg={formState.errors['email']?.message} />
					<FormInput id={'name'} register={register("name", { required: FORM_ERR_MSG.required, pattern: { value: NAME_REGEX, message: FORM_ERR_MSG.invalidName } })} errorMsg={formState.errors['name']?.message} />
					<FormInput id={'password'} register={register("password", { required: FORM_ERR_MSG.required, pattern: { value: PW_REGEX, message: FORM_ERR_MSG.invalidPw } })} errorMsg={formState.errors['password']?.message} />
					<FormInput id={'confirm_password'} register={register("confirm_password", { required: FORM_ERR_MSG.required, pattern: { value: PW_REGEX, message: FORM_ERR_MSG.invalidPw }, validate: { samePw: val => val === getValues('password') || FORM_ERR_MSG.invalidConfirmPw } })} errorMsg={formState.errors['confirm_password']?.message} />
					<Link href='/user/logIn'>
						<a className="my-4 text-sm text-right text-primary hover:underline">로그인 하기</a>
					</Link>
					<Button onClick={() => alert()}>가입</Button>
				</form>
			</FormLayout>
		</MobileLayout>
	)
}

export default SignUp