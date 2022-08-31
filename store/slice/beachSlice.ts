import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BeachResponse } from '@utils/interfaces'
import { getBeach } from '@utils/fetchers/publicApi'

export interface BeachState {
  beachName: string
  searchedBeach: BeachResponse | undefined
  likedBeachs: BeachResponse[] | undefined
  likedBeach: BeachResponse | undefined
  topTen: BeachResponse[] | undefined
  status: {
    loading: boolean
    error: string | null | undefined
  }
}
// 선택한 해수욕장명, 군구명을 전역상태 관리 gugun_nm sta_nm
const initialState: BeachState = {
  beachName: '',
  searchedBeach: undefined,
  likedBeachs: undefined,
  likedBeach: undefined,
  topTen: undefined,
  status: {
    loading: false,
    error: null,
  },
}

export const fetchTopTen = createAsyncThunk<BeachResponse[]>(
  'fetchTopTen',
  async () => {
    try {
      const {
        data: { topTenBeach },
      } = await axios.get('/api/beach/topTen')
      return topTenBeach
    } catch (error) {
      throw error
    }
  }
)
interface IfetchSelectedParams {
  sido_nm: string
  gugun_nm: string
  sta_nm: string
}
export const fetchSelected = createAsyncThunk<
  BeachResponse,
  IfetchSelectedParams
>('fetchSelected', async ({ sido_nm, gugun_nm, sta_nm }) => {
  try {
    const res = await getBeach(sido_nm)
    return res?.find(
      (cur: any) => cur.gugun_nm === gugun_nm && cur.sta_nm === sta_nm
    )
  } catch (error) {
    throw error
  }
})

const beachSlice = createSlice({
  name: 'beach',
  initialState,
  reducers: {
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
      state.likedBeach = state.likedBeachs.find(
        (cur) => cur.gugun_nm === gugun_nm && cur.sta_nm === sta_nm
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopTen.fulfilled, (state, { payload }) => {
      state.topTen = payload
      state.status.loading = false
    })
    builder.addCase(fetchSelected.fulfilled, (state, { payload }) => {
      state.searchedBeach = payload
      state.status.loading = false
    })
    builder.addCase(fetchTopTen.rejected, (state, action) => {
      state.status.error = action.error.message
      state.status.loading = false
    })
    builder.addCase(fetchTopTen.pending, (state) => {
      state.status.loading = true
    })
  },
})

export const beachReducer = beachSlice.reducer

export const { setSearched, setLikedBeachs, setLikedBeach } = beachSlice.actions
