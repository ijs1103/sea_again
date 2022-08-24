import MobileLayout from '@components/layout/MobileLayout'
import FormLayout from '@components/layout/FormLayout'
import Button from '@components/layout/Button'
import { useForm } from 'react-hook-form'
import FormInput from '@components/FormInput'
import { ProfileForm } from '@utils/interfaces'
import {
	BUCKET_URL,
	FORM_ERR_MSG, NAME_REGEX,
	PW_REGEX,
} from '@utils/constants'
import useAuth from '@hooks/useAuth'
import useEditProfile from '@hooks/useQueries/useEditProfile'
import Avatar from '@components/layout/Avatar'
import { useEffect, useState } from 'react'
import axios from 'axios'


function Profile() {
	const { profile } = useAuth()
	const { register, handleSubmit, formState, getValues, watch } =
		useForm<ProfileForm>({ mode: "onChange" })
	const { editProfile } = useEditProfile()
	const [preview, setPreview] = useState<string>('')
	const avatar = watch('avatar')
	let blobUrl = ""
	// blob 생성 
	useEffect(() => {
		if (avatar?.length) {
			const file = avatar[0]
			blobUrl = URL.createObjectURL(file)
			setPreview(blobUrl)
		}
		return () => {
			URL.revokeObjectURL(blobUrl)
		}
	}, [avatar])

	const onValid = async (form: ProfileForm) => {
		const { new_password } = form
		let newAvatar = ''
		if (avatar?.length) {
			const file = avatar[0]
			const { data: { url, objectName } } = await axios.post('/api/user/uploadAvatar', { name: file.name, type: file.type })
			await axios.put(url, file, {
				headers: {
					'Content-type': file.type,
					'Access-Control-Allow-Origin': '*',
				},
			})
			newAvatar = BUCKET_URL + objectName
		}
		editProfile({ ...(avatar && { avatar: newAvatar }), ...(form?.name && { name: form?.name }), password: new_password, email: profile?.email })
	}

	return (
		<MobileLayout isGoBack={false}>
			<FormLayout label='프로필 변경'>
				<form onSubmit={handleSubmit(onValid)} className='form-layout'>
					<label className='block mx-auto cursor-pointer'>
						<Avatar url={preview ? preview : profile?.avatar} />
						<input
							{...register('avatar')}
							type='file'
							accept='image/*'
							className='hidden'
						/>
					</label>
					<span className='text-primary text-[12px] text-right'>* 정보 변경을 위해 새 비밀번호를 입력 해주세요</span>
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
							</div>
							<input type="text" id="email" className="brightness-75 opacity-75 outline-none bg-gray-50 text-gray-900 text-sm rounded-lg  focus:border-primary border-2 block w-full pl-10 p-2.5 border-gray-300" placeholder={profile?.email} disabled />
						</div>
					</div>
					<FormInput id={'name'} register={register("name", { pattern: { value: NAME_REGEX, message: FORM_ERR_MSG.invalidName }, validate: { samePrevName: val => val !== profile?.name || FORM_ERR_MSG.samePrevName } })} errorMsg={formState.errors['name']?.message} namePlaceholder={profile?.name} />
					<FormInput id={'new_password'} register={register("new_password", { required: FORM_ERR_MSG.required, pattern: { value: PW_REGEX, message: FORM_ERR_MSG.invalidPw } })} errorMsg={formState.errors['new_password']?.message} />
					<FormInput id={'confirm_password'} register={register("confirm_password", { required: FORM_ERR_MSG.required, pattern: { value: PW_REGEX, message: FORM_ERR_MSG.invalidPw }, validate: { samePw: val => val === getValues('new_password') || FORM_ERR_MSG.invalidConfirmPw } })} errorMsg={formState.errors['confirm_password']?.message} />
					<div className='mt-3'></div>
					<Button>변경</Button>
				</form>
			</FormLayout>
		</MobileLayout>
	)
}

export default Profile
