import React from 'react'
import Loader from '@components/Loader'
import CheckMessage from '@components/layout/CheckMessage'
import useWaterQuality from '@hooks/useQueries/useWaterQuality'

interface Props {
	sido_nm: string
	sta_nm: string
}
function WaterQuality({ sido_nm, sta_nm }: Props) {
	const { waterQuality, isLoading } = useWaterQuality(sido_nm, sta_nm)
	return (
		<div className='relative flex flex-col items-center justify-center h-full'>
			{isLoading ? <Loader /> : <CheckMessage {...waterQuality} />}
		</div>
	)
}

export default WaterQuality