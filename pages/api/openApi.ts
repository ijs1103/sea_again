import axios from 'axios'
import { WeatherParams, BeachParams } from '@utils/interfaces'
import { WEATHER_BASE_URL, BEACH_BASE_URL } from '@utils/constants'

const getWeather = async (params: WeatherParams) => {
  const {
    data: {
      response: {
        body: {
          items: { item },
        },
      },
    },
  } = await axios.get<any>(WEATHER_BASE_URL, {
    params,
  })
  return item
}

const getBeach = async (params: BeachParams) => {
  const { data } = await axios.get<any>(BEACH_BASE_URL, {
    params,
  })
  return data
}

export { getBeach, getWeather }
