export interface WeatherParams {
  serviceKey: string | undefined
  numOfRows?: number
  base_date: string
  base_time: string
  nx: number
  ny: number
  dataType: 'JSON'
}
export interface WeatherResponse {
  baseDate: string
  baseTime: string
  category: string
  fcstDate: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}
export interface BeachParams {
  ServiceKey: string | undefined
  pageNo: number
  numOfRows: number
  SIDO_NM: string
  resultType: string
}
export interface BeachResponse {
  beach_img: string | null
  beach_knd: string | null
  beach_len: string | null
  beach_wid: string | null
  gugun_nm: string
  lat: string
  link_addr: string
  link_nm: string
  link_tel: string | null
  lon: string
  num: number
  sido_nm: string
  sta_nm: string
}
