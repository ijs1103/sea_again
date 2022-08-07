import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getBeach } from './api/openApi'
import { today } from '@utils/aboutTime'
import { WeatherResponse } from '@utils/interfaces'
import { W_CATEGORY } from '@utils/constants'

function weatherTest() {
	const { base_date, base_time } = today()
	const payload = {
		ServiceKey: process.env.NEXT_PUBLIC_APIKEY,
		resultType: 'json',
		pageNo: 1,
		numOfRows: 100,
		SIDO_NM: '부산',
	}
	const { data, loading, error } = useQuery<any>(['beach'], () => getBeach(payload))
	console.log(data)
	return (
		<>
			<h1>beach Test</h1>

		</>
	)
}

export default weatherTest