import React from 'react'
import Loader from '@components/Loader'
import CheckMessage from '@components/layout/CheckMessage'
import useSand from '@hooks/useQueries/useSand'


interface Props {
	sido_nm: string
	sta_nm: string
}
function Sand({ sido_nm, sta_nm }: Props) {
	const { sand, isLoading } = useSand(sido_nm, sta_nm)
	return (
		<div className='relative flex flex-col items-center justify-center h-full'>
			{isLoading ? <Loader /> : <CheckMessage {...sand} />}
		</div>
	)
}

export default Sand