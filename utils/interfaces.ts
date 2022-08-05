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
