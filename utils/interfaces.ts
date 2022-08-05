export interface WeatherParams {
  serviceKey: string | undefined
  dataType: string
  numOfRows?: number
  base_date: string
  base_time: string
  nx: number
  ny: number
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
