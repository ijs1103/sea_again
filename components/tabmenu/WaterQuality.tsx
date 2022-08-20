import React from 'react'
import { getWater } from '@utils/fetchers/publicApi'
import { useQuery } from '@tanstack/react-query'
import Loader from '@components/Loader'
import { CheckResponse } from '@utils/interfaces'
import CheckMessage from '@components/layout/CheckMessage'

interface Props {
	sido_nm: string
	sta_nm: string
}
function WaterQuality({ sido_nm, sta_nm }: Props) {
	const { data, isLoading } = useQuery<CheckResponse>(['water'], () => getWater(sido_nm, sta_nm))
	return (
		<div className='relative flex flex-col items-center justify-center h-full'>
			{isLoading ? <Loader /> : <CheckMessage {...data} />}
		</div>
	)
}

export default WaterQuality