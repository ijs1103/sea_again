import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getWeather } from './apis/getWeather'
import { today } from '@utils/aboutTime'
import { WeatherResponse } from '@utils/interfaces'
import { W_CATEGORY } from '@utils/constants'

function weatherTest() {
	const { base_date, base_time } = today()
	console.log(base_date, base_time)
	const params = ({ base_date, base_time, nx, ny }) => {
		return {
			serviceKey: process.env.NEXT_PUBLIC_WEATHER_KEY,
			dataType: 'JSON',
			/* 총 데이터는 60개인데, 내가 필요한 카테고리 데이터는 30개만 불러들이면 된다 */
			numOfRows: 30,
			base_date,
			base_time,
			nx,
			ny,
		}
	}
	const payload = params({
		base_date,
		base_time,
		nx: 55,
		ny: 127,
	})
	const { data, loading, error } = useQuery<WeatherResponse>(['weather'], () => getWeather(payload))
	const parsedData = useMemo(() => data?.filter(cur => ['T1H', 'PTY', 'SKY'].includes(cur.category)).sort((a, b) => a.fcstTime - b.fcstTime), [data])
	return (
		<>
			<h1>weatherTest</h1>
			{parsedData?.map((cur, idx) =>
				<div key={idx}>
					관측타입: {cur.category} 관측시각: {cur.fcstTime} 관측데이터: {cur.category !== 'T1H' ? W_CATEGORY[cur.category][cur.fcstValue] : cur.fcstValue}
				</div>
			)}
		</>
	)
}

export default weatherTest