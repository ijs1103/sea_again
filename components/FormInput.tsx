import { memo } from 'react'
import { cls } from '@utils/index'
import { idToLabel } from '@utils/constants'
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
	id: string
	errorMsg: string | undefined
	register: UseFormRegisterReturn
}
function FormInput({ id, register, errorMsg }: Props) {
	return (
		<div>
			<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{idToLabel[id]}</label>
			{id === 'email' &&
				<div className="relative">
					<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
					</div>
					<input type="text" {...register} id={id} className={cls("outline-none bg-gray-50 text-gray-900 text-sm rounded-lg  focus:border-primary border-2 block w-full pl-10 p-2.5 ", errorMsg ? 'border-red-500' : 'border-gray-300')} placeholder="abcde@naver.com" />
				</div>
			}
			{id === 'name' &&
				<div className="flex">
					<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
						@
					</span>
					<input type="text" {...register} id={id} className={cls("outline-none rounded-r-lg bg-gray-50  text-gray-900 focus:border-primary border-2 block flex-1 min-w-0 w-full text-sm p-2.5 ", errorMsg ? 'border-red-500' : 'border-gray-300')} placeholder="elonmusk" />
				</div>
			}
			{['password', 'new_password', 'confirm_password'].includes(id) && <input type="password" {...register} id={id} className={cls("outline-none bg-gray-50 text-gray-900 text-sm rounded-lg focus:border-primary border-2 block w-full p-2.5 ", errorMsg ? 'border-red-500' : 'border-gray-300')} placeholder="•••••••••" />
			}
			{errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}
		</div>
	)
}

export default memo(FormInput, (prevProps, nextProps) => prevProps.errorMsg === nextProps.errorMsg)