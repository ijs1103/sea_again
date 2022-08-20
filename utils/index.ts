const cls = (...classnames: string[]) => classnames.join('')
interface Code {
  [key: string]: number
}
const weatherToIcon = (code: Code) => {
  if ([1, 5].includes(code['PTY'])) return 'rainny'
  if ([2, 3, 6, 7].includes(code['PTY'])) return 'snowy'
  if (code['SKY'] === 1) return 'sunny'
  if (code['SKY'] === 3) return 'cloudy'
  if (code['SKY'] === 4) return 'foggy'
}
interface LatLngTypes {
  geoY: number
  geoX: number
}
/* 위도,경도를 기상청 api 호출에 필요한 x,y 좌표로 변환하는 함수 */
const latLngToXy = ({ geoX, geoY }: LatLngTypes) => {
  const RE = 6371.00877 // 지구 반경(km)
  const GRID = 5.0 // 격자 간격(km)
  const SLAT1 = 30.0 // 투영 위도1(degree)
  const SLAT2 = 60.0 // 투영 위도2(degree)
  const OLON = 126.0 // 기준점 경도(degree)
  const OLAT = 38.0 // 기준점 위도(degree)
  const XO = 43 // 기준점 X좌표(GRID)
  const YO = 136 // 기준점 Y좌표(GRID)
  const DEGRAD = Math.PI / 180.0
  const RADDEG = 180.0 / Math.PI

  const re = RE / GRID
  const slat1 = SLAT1 * DEGRAD
  const slat2 = SLAT2 * DEGRAD
  const olon = OLON * DEGRAD
  const olat = OLAT * DEGRAD

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5)
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn)
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5)
  ro = (re * sf) / Math.pow(ro, sn)
  const rs: any = {}
  rs['lat'] = geoY
  rs['lng'] = geoX
  let ra = Math.tan(Math.PI * 0.25 + geoY * DEGRAD * 0.5)

  ra = (re * sf) / Math.pow(ra, sn)

  let theta = geoX * DEGRAD - olon

  if (theta > Math.PI) theta -= 2.0 * Math.PI
  if (theta < -Math.PI) theta += 2.0 * Math.PI
  theta *= sn
  rs['nx'] = Math.floor(ra * Math.sin(theta) + XO + 0.5)
  rs['ny'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)

  return {
    rs: rs,
  }
}
const extractOnlyPhoneNum = (str: string) => {
  return str.replace(/[^0-9|-]/g, '')
}
const parseCookies = (cookie = '') => {
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc: any, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v)
      return acc
    }, {})
}

const getRandomSrc = () =>
  `/beaches/beach${Math.ceil(Math.random() * 20) + 1}.jpeg`

export {
  cls,
  weatherToIcon,
  latLngToXy,
  extractOnlyPhoneNum,
  parseCookies,
  getRandomSrc,
}
