import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// 선택한 해수욕장명, 군구명을 전역상태 관리 gugun_nm sta_nm
const initialState = {
  beachName: '',
}
const beachSlice = createSlice({
  name: 'beach',
  initialState,
  reducers: {
    setBeachName(state, action) {
      state.beachName = action.payload
    },
  },
})
export const beachReducer = beachSlice.reducer

export const { setBeachName } = beachSlice.actions
