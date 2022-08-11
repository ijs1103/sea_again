import axios from 'axios'
import {
  WEATHER_BASE_URL,
  BEACH_BASE_URL,
  WATER_BASE_URL,
  SAND_BASE_URL,
  NO_RESEARCH_MSG,
} from '@utils/constants'
import { getCurrentTime, timestampToDate } from '@utils/aboutTime'
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

const getWater = async (SIDO_NM: string, sta_nm: string) => {
  const params = {
    ServiceKey: process.env.NEXT_PUBLIC_APIKEY,
    resultType: 'json',
    pageNo: 1,
    numOfRows: 100,
    RES_YEAR: 2019,
    SIDO_NM,
  }

  const {
    data: {
      getOceansBeachSeawaterInfo: { item },
    },
  } = await axios.get<any>(WATER_BASE_URL, {
    params,
  })
  console.log(item)
  // sta_nm(해수욕장 이름)이 수질확인 api 데이터와 일치하는 데이터(배열)를 모두 찾고,
  // 해당 배열의 res_yn(적합여부)가 전부 "적합"이면 적합 판정 O , 하나의 res_yn(적합여부)라도 "부적합"이면 적합 판정 X
  const tempArr = item.filter((cur: any) => cur.sta_nm === sta_nm)
  if (!tempArr.length) return { message: NO_RESEARCH_MSG }
  const ok = tempArr.every((cur: any) => cur.res_yn === '적합')
  // res_date(조사일자)는 timestamp 값인데 reduce 함수로 최대값, 즉 가장 최신의 조사일자를 의미한다
  const latestTestDate =
    timestampToDate(
      tempArr.reduce((a: any, c: any) =>
        a.res_date > c.res_date ? a.res_date : c.res_date
      )
    ) || '없음'
  return { ok, testDate: latestTestDate }
}

const getSand = async (SIDO_NM: string, sta_nm: string) => {
  const params = {
    ServiceKey: process.env.NEXT_PUBLIC_APIKEY,
    resultType: 'json',
    pageNo: 1,
    numOfRows: 100,
    RES_YEAR: 2019,
    SIDO_NM,
  }
  const {
    data: {
      getOceansBeachSandInfo: { item },
    },
  } = await axios.get<any>(SAND_BASE_URL, {
    params,
  })
  // sta_nm(해수욕장 이름)이 수질확인 api 데이터와 일치하는 데이터를 찾고,
  // 해당 배열의 res_yn(적합여부)가 전부 "적합"이면 적합 판정 O , 하나의 res_yn(적합여부)라도 "부적합"이면 적합 판정 X
  const existingBeach = item.find((cur: any) => cur.sta_nm === sta_nm)
  if (!existingBeach) return { message: NO_RESEARCH_MSG }
  const ok = existingBeach.res_yn === '적합'
  // res_date(조사일자)는 timestamp 값인데 reduce 함수로 최대값, 즉 가장 최신의 조사일자를 의미한다
  const testDate = existingBeach.res_date || '없음'
  return { ok, testDate }
}

export { getBeach, getWeather, getWater, getSand }
