import axios from 'axios'
import { WeatherParams, BeachParams } from '@utils/interfaces'
import { WEATHER_BASE_URL, BEACH_BASE_URL } from '@utils/constants'
import { getCurrentTime } from './aboutTime'
import { latLngToXy } from '@utils/index'

const getWeather = async (lat: string, lon: string) => {
  const {
    rs: { nx, ny },
  } = latLngToXy({ geoY: +lat, geoX: +lon })
  const { base_date, base_time } = getCurrentTime()
  const params = {
    serviceKey: process.env.NEXT_PUBLIC_APIKEY,
    dataType: 'JSON',
    /* api 한번 호출할 때, 불러올수 있는 데이터는 총 60개인데, 내가 필요한 카테고리 데이터는 30개이다 */
    numOfRows: 30,
    base_date,
    base_time,
    nx,
    ny,
  }
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
  /* 기온, 하늘상태, 눈비 여부에 해당되는 데이터를 불러오고 가장 최신의 예보만 불러오게 파싱하였음 */
  const parsed = await item
    .map((cur: any) => {
      if (['T1H', 'PTY', 'SKY'].includes(cur.category)) {
        return { ...cur, currentTime: cur.fcstDate + cur.fcstTime }
      }
    })
    .sort((a: any, b: any) => a.currentTime - b.currentTime)
    .slice(0, 3)
  return parsed
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
