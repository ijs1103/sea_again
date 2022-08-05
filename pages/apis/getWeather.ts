import axios from 'axios'
import { WeatherParams } from '@utils/interfaces'
import { WEATHER_BASE_URL } from '@utils/constants'

export const getWeather = async (params: WeatherParams) => {
  const {
    data: {
      response: {
        body: {
          items: { item },
        },
      },
    },
  } = await axios.get<any>(WEATHER_BASE_URL, {
    params
  })
  return item
}
