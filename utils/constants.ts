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

const idToLabel: { [key: string]: string } = {
  email: '이메일',
  name: '유저이름',
  password: '비밀번호',
  new_password: '새 비밀번호',
  confirm_password: '비밀번호 확인',
} as const
const NAME_REGEX = /^[a-zA-Z]{5,10}$/
const PW_REGEX = /^[a-zA-Z0-9]{8,16}$/
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const REVIEW_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 \t]{5,}$/
const FORM_ERR_MSG = {
  required: '해당란을 입력해주세요.',
  invalidName: '5~10자의 영문 대 소문자만 사용 가능합니다.',
  invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
  invalidConfirmPw: '비밀번호가 일치하지 않습니다.',
  invalidEmail: '올바른 이메일 패턴이 아닙니다.',
  invalidReview: '5자 이상의 영문 대소문자 한글만 입력해주세요.',
  samePrevName: '이전과 다른 유저이름을 입력해주세요.',
  samePrevPw: '이전과 다른 비밀번호를 입력해주세요.',
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
  idToLabel,
  NAME_REGEX,
  PW_REGEX,
  EMAIL_REGEX,
  FORM_ERR_MSG,
  REVIEW_REGEX,
}
