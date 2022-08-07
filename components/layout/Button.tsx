import React from 'react'
interface Props {
	children: React.ReactNode;
	onClick: () => void;
}
function Button({ children, onClick }: Props) {
	return (
		<button className='bg-primary hover:brightness-75 text-white text-base w-[200px] py-2 rounded-[10px]' onClick={onClick}>{children}</button>
	)
}

export default Button