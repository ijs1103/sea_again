import React from 'react'
interface Props {
	children: React.ReactNode
	onClick?: () => void
	disabled?: boolean
}
function Button({ children, onClick, disabled }: Props) {
	return (
		<button disabled={disabled} className='bg-primary disabled:opacity-50 hover:brightness-75 text-white text-base w-full py-2 rounded-[10px]' onClick={onClick}>{children}</button>
	)
}

export default Button