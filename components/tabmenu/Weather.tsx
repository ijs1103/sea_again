import Image from 'next/image'
import { weatherToIcon } from 'utils/index'
import { WeatherResponse } from '@utils/interfaces'
import { useQuery } from '@tanstack/react-query'
import { getWeather } from '@utils/openApi'
import { convertHour } from '@utils/aboutTime'
import { W_CATEGORY } from '@utils/constants'
import Loader from '@components/Loader'

interface Props {
	lat: string
	lon: string
}

function Weather({ lat, lon }: Props) {
	// enabled 옵션 :  lat(위도)과 lon(경도)값이 undefined가 아닐때에만 데이터 fetch가 실행된다 
	const { data, isLoading, refetch } = useQuery<WeatherResponse[]>(['weather_forcast'], () => getWeather(lat, lon), { enabled: !!lat && !!lon })
	return (
		<div className='h-full flex flex-col items-center relative'>
			{isLoading ? <Loader /> :
				<>
					<div onClick={() => refetch()} className='cursor-pointer absolute right-0 flex flex-col items-center gap-1'>
						<svg className='fill-gray-500 w-5 h-5' viewBox="0 0 67 84" xmlns="http://www.w3.org/2000/svg">
							<path d="M33.3333 16.6667V0L12.5 20.8333L33.3333 41.6667V25C47.125 25 58.3333 36.2083 58.3333 50C58.3333 63.7917 47.125 75 33.3333 75C19.5417 75 8.33333 63.7917 8.33333 50H0C0 68.4167 14.9167 83.3333 33.3333 83.3333C51.75 83.3333 66.6667 68.4167 66.6667 50C66.6667 31.5833 51.75 16.6667 33.3333 16.6667Z" fill="black" />
						</svg>
						<span className='text-[10px]'>새로고침</span>
					</div>

					{data && data[0].fcstValue ? <Image src={`/${weatherToIcon({ PTY: +data[0].fcstValue, SKY: +data[1].fcstValue })}.gif`} width={100} height={100} alt='weather_img' /> : <div className='w-[100px] h-[100px] bg-lightGray'></div>}
					<span className='text-2xl text-black font-extrabold'>{data && data[2].fcstValue}℃</span>
					<span className='text-fontSecondary'>{data && W_CATEGORY['PTY'][data[0].fcstValue]} | {data && W_CATEGORY['SKY'][data[1].fcstValue]}</span>
					<span className='text-gray-500 text-[12px] font-bold w-full text-right'>기상청 {data && convertHour(data[0].fcstTime)} 예보</span>
				</>
			}
		</div>
	)
}

export default Weather