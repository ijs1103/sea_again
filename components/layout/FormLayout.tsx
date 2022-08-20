import React from 'react'
interface Props {
	label: string
	children: React.ReactNode
}
function FormLayout({ label, children }: Props) {
	return (
		<div className='flex flex-col items-center gap-3'>
			<h2 className='text-2xl font-bold select-none sm:text-3xl'>{label}</h2>
			{children}
		</div>
	)
}

export default FormLayout