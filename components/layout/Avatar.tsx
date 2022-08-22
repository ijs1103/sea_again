import Image from 'next/image'
Image

interface Props {
	url: string
}

function Avatar({ url }: Props) {
	return (
		!url ?
			<div
				className='flex items-center justify-center w-12 h-12 p-1 rounded-full bg-primary'
			>
				<svg
					className='w-12 h-12 stroke-gray-100'
					fill='none'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M12 6v6m0 0v6m0-6h6m-6 0H6'
					></path>
				</svg></div> :
			<Image
				width={48}
				height={48}
				src={url}
				className='rounded-full bg-slate-500'
				alt='avatar-image'
			/>
	)
}

export default Avatar