import React from 'react'
import MobileLayout from '@components/layout/MobileLayout'
import FormLayout from '@components/layout/FormLayout'
import { cls } from '@utils/index'
import Button from '@components/layout/Button'
import { useForm } from 'react-hook-form'
import FormInput from '@components/FormInput'
import { ProfileForm } from '@utils/interfaces'
import {
	FORM_ERR_MSG, NAME_REGEX,
	PW_REGEX,
} from '@utils/constants'

function profile() {
	const isError = false
	const { register, handleSubmit, formState, getValues } =
		useForm<ProfileForm>({ mode: "onChange" })
	const onValid = (form: ProfileForm) => {
		//login 로직

	}
	return (
		<MobileLayout isGoBack={false}>
			<FormLayout label='프로필 변경'>
				<form onSubmit={handleSubmit(onValid)} className='min-w-[500px] flex flex-col gap-3'>
					<span className='text-primary text-[12px] text-right'>* 정보 변경을 위해 새 비밀번호를 입력 해주세요</span>
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
						<div className="relative">
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
							</div>
							<input type="text" id="email" className={cls("brightness-75 opacity-75 outline-none bg-gray-50 text-gray-900 text-sm rounded-lg  focus:border-primary border-2 block w-full pl-10 p-2.5 ", isError ? 'border-red-500' : 'border-gray-300')} placeholder="abcde@naver.com" disabled />
						</div>
					</div>
					<FormInput id={'name'} register={register("name", { required: FORM_ERR_MSG.required, pattern: { value: NAME_REGEX, message: FORM_ERR_MSG.invalidName } })} errorMsg={formState.errors['name']?.message} />
					<FormInput id={'new_password'} register={register("new_password", { required: FORM_ERR_MSG.required, pattern: { value: PW_REGEX, message: FORM_ERR_MSG.invalidPw } })} errorMsg={formState.errors['new_password']?.message} />
					<FormInput id={'confirm_password'} register={register("confirm_password", { required: FORM_ERR_MSG.required, pattern: { value: PW_REGEX, message: FORM_ERR_MSG.invalidPw }, validate: { samePw: val => val === getValues('new_password') || FORM_ERR_MSG.invalidConfirmPw } })} errorMsg={formState.errors['confirm_password']?.message} />
					<div className='mt-3'></div>
					<Button>변경</Button>
				</form>
			</FormLayout>
		</MobileLayout>
	)
}

export default profile