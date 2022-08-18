import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BeachResponse } from '@utils/interfaces'

export interface BeachState {
  beachName: string
  searchedBeach: BeachResponse | undefined
  likedBeachs: BeachResponse[] | undefined
  likedBeach: BeachResponse | undefined
}
// 선택한 해수욕장명, 군구명을 전역상태 관리 gugun_nm sta_nm
const initialState: BeachState = {
  beachName: '',
  searchedBeach: undefined,
  likedBeachs: undefined,
  likedBeach: undefined,
}
const beachSlice = createSlice({
  name: 'beach',
  initialState,
  reducers: {
    setBeachName(state, { payload }) {
      state.beachName = payload
    },
    setSearched(state, { payload }) {
      state.searchedBeach = payload
    },
    //payload: BeachResponse[]
    setLikedBeachs(state, { payload }) {
      if (!payload.length) return
      state.likedBeachs = [...payload]
    },
    //payload: { sta_nm: string, gugun_nm: string }
    setLikedBeach(state, { payload }) {
      if (!state.likedBeachs?.length) return
      const { sta_nm, gugun_nm } = payload
      console.log(sta_nm, gugun_nm)
      state.likedBeach = state.likedBeachs.find(
        (cur) => cur.gugun_nm === gugun_nm && cur.sta_nm === sta_nm
      )
    },
  },
})
export const beachReducer = beachSlice.reducer

export const { setBeachName, setSearched, setLikedBeachs, setLikedBeach } =
  beachSlice.actions
