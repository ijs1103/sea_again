import Image from 'next/image'
import { weatherToIcon } from 'utils/index'
import { convertHour } from '@utils/aboutTime'
import { W_CATEGORY } from '@utils/constants'
import Loader from '@components/Loader'
import useWeather from '@hooks/useQueries/useWeather'

interface Props {
	lat: string
	lon: string
}

const Weather = ({ lat, lon }: Props) => {
	const { weather, refetch, isLoading } = useWeather(lat, lon)
	return (
		<div className='relative flex flex-col items-center h-full'>
			{isLoading ? <Loader /> :
				<>
					<div onClick={() => refetch()} className='absolute right-0 flex flex-col items-center gap-1 p-1.5 rounded-full transition cursor-pointer hover:bg-lightGray'>
						<svg className='w-3 h-3 sm:w-5 sm:h-5 fill-gray-500' viewBox="0 0 67 84" xmlns="http://www.w3.org/2000/svg">
							<path d="M33.3333 16.6667V0L12.5 20.8333L33.3333 41.6667V25C47.125 25 58.3333 36.2083 58.3333 50C58.3333 63.7917 47.125 75 33.3333 75C19.5417 75 8.33333 63.7917 8.33333 50H0C0 68.4167 14.9167 83.3333 33.3333 83.3333C51.75 83.3333 66.6667 68.4167 66.6667 50C66.6667 31.5833 51.75 16.6667 33.3333 16.6667Z" fill="black" />
						</svg>
						<span className='text-[6px] sm:text-[10px]'>새로고침</span>
					</div>
					{weather && weather[0].fcstValue ? <Image src={`/${weatherToIcon({ PTY: +weather[0].fcstValue, SKY: +weather[1].fcstValue })}.gif`} width={100} height={100} alt='weather_img' /> : <div className='w-[100px] h-[100px] bg-lightGray'></div>}
					<span className='text-xl font-extrabold text-black sm:text-2xl'>{weather && weather[2].fcstValue}℃</span>
					<span className='text-sm sm:text-base text-fontSecondary'>{weather && W_CATEGORY['PTY'][weather[0].fcstValue]} | {weather && W_CATEGORY['SKY'][weather[1].fcstValue]}</span>
					<span className='text-gray-500 text-[8px] sm:text-[12px] font-bold w-full text-right'>기상청 {weather && convertHour(weather[0].fcstTime)} 예보</span>
				</>
			}
		</div>
	)
}
export default Weather

