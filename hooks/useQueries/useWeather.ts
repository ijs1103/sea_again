import { useQuery } from '@tanstack/react-query'
import { WeatherResponse } from '@utils/interfaces'
import { getWeather } from '@utils/fetchers/publicApi'

function useWeather(lat: string, lon: string) {
  const {
    data: weather,
    isLoading,
    refetch,
    error,
  } = useQuery<WeatherResponse[]>(
    ['weather_forcast'],
    () => getWeather(lat, lon),
    { enabled: !!lat && !!lon }
  )

  return {
    weather,
    isLoading,
    error,
    refetch,
  }
}

export default useWeather
