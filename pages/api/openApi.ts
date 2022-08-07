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

const getBeach = async (SIDO_NM: string) => {
  const params = {
    ServiceKey: process.env.NEXT_PUBLIC_APIKEY,
    resultType: 'json',
    pageNo: 1,
    numOfRows: 100,
    SIDO_NM,
  }
  const {
    data: {
      getOceansBeachInfo: { item },
    },
  } = await axios.get<any>(BEACH_BASE_URL, {
    params,
  })
  return item
}

export { getBeach, getWeather }
