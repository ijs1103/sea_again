import Image from 'next/image'
import { cls } from '@utils/index'
import { BLUR_DATA_URL } from '@utils/constants'

interface Props {
	url: string,
	isSmall?: boolean
}

function Avatar({ url, isSmall = false }: Props) {
	return (
		url ?
			<div className={cls('overflow-hidden relative rounded-full bg-slate-500 ', isSmall ? 'w-5 h-5 sm:w-8 sm:h-8' : 'w-12 h-12')}>
				<Image
					src={url}
					className='object-cover'
					alt='avatar-image'
					layout='fill'
					blurDataURL={BLUR_DATA_URL}
					placeholder='blur'
				/>
			</div> :
			<div className={cls('flex items-center justify-center p-1 rounded-full bg-primary ', isSmall ? 'w-5 h-5 sm:w-8 sm:h-8' : 'w-12 h-12')}>
				<svg
					className='stroke-gray-100'
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
				</svg></div>

	)
}

export default Avatar