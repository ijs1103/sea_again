import { TabType } from '@utils/interfaces'

const SIDO_ARR = [
  '인천',
  '강원',
  '충남',
  '경북',
  '경남',
  '전북',
  '전남',
  '울산',
  '부산',
  '제주',
]
const TAB_ARR: TabType[] = ['날씨', '수질', '모래', '후기']
const KAKAO_MAP_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`
const WEATHER_BASE_URL =
  'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
const BEACH_BASE_URL =
  'https://apis.data.go.kr/1192000/service/OceansBeachInfoService1/getOceansBeachInfo1'
const WATER_BASE_URL =
  'http://apis.data.go.kr/1192000/service/OceansBeachSeawaterService1/getOceansBeachSeawaterInfo1'
const SAND_BASE_URL =
  'http://apis.data.go.kr/1192000/service/OceansBeachSandService1/getOceansBeachSandInfo1'
const NO_RESEARCH_MSG = '😥 조사기록 없음'
const W_CATEGORY = {
  PTY: {
    0: '없음',
    1: '비',
    2: '비/눈',
    3: '눈',
    5: '빗방울',
    6: '빗방울 눈날림',
    7: '눈날림',
  },
  SKY: {
    1: '맑음',
    3: '구름많음',
    4: '흐림',
  },
} as const

export {
  KAKAO_MAP_URL,
  WEATHER_BASE_URL,
  BEACH_BASE_URL,
  WATER_BASE_URL,
  SAND_BASE_URL,
  NO_RESEARCH_MSG,
  W_CATEGORY,
  SIDO_ARR,
  TAB_ARR,
}
