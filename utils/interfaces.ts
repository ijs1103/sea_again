export interface WeatherParams {
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
export type TabType = '날씨' | '수질' | '모래' | '후기'
export interface CheckResponse {
  ok?: boolean
  testDate?: string
  message?: string
}
export interface LoginForm {
  email: string
  password: string
}
export interface SignUpForm extends LoginForm {
  name: string
  confirm_password: string
}
export interface AccountType {
  email: string
  name: string
  password: string
}
export interface EditAccountType {
  name?: string
  password: string
}
export interface ProfileForm {
  name: string
  new_password: string
  confirm_password: string
}
export interface ResponseType {
  ok: boolean
  [key: string]: any
}
export interface createReviewType {
  payload: string
  beachName: string
}
export interface getReviewsType {
  limit: number
  offset: number
  beachName: string
}
export interface Position {
  lat: number
  lng: number
}
export interface IAddMarker {
  position: Position
  map: any
  beachName?: string
  rank?: number
}
