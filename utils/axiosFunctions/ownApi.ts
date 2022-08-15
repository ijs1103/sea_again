import axios from 'axios'
import {
  AccountType,
  EditAccountType,
  LoginForm,
  createReviewType,
  getReviewsType,
} from '@utils/interfaces'

const authFetcher = () => {
  const res = axios.get('/api/user/validateUser')
  return res
}
const createAccount = async (newAccount: AccountType) => {
  const res = await axios.post('/api/user/signUp', newAccount)
  return res
}
const editAccount = async (editAccount: EditAccountType) => {
  const res = await axios.put('/api/user/editProfile', editAccount)
  return res
}
const userLogIn = async (logInParams: LoginForm) => {
  const res = await axios.post('/api/user/logIn', logInParams)
  return res
}
const userLogOut = async () => {
  const res = await axios.post('/api/user/logOut')
  return res
}
const toggleLikeFetcher = async (beachName: string) => {
  const res = await axios.post(`/api/beach/${beachName}/toggleLike`)
  return res
}
const getBeachByName = async (beachName: string) => {
  const { data } = await axios.get(`/api/beach/${beachName}`)
  return data
}
const createReview = async (createReview: createReviewType) => {
  const { data } = await axios.post('/api/review/new', createReview)
  return data
}
const getReviews = async (getReviews: getReviewsType) => {
  const { data } = await axios.get('/api/review/all', {
    params: getReviews,
  })
  return data
}
const deleteReview = async ({ reviewId }: { reviewId: number }) => {
  const { data } = await axios.post('/api/review/delete', {
    reviewId,
  })
  return data
}
export {
  authFetcher,
  createAccount,
  userLogIn,
  editAccount,
  userLogOut,
  toggleLikeFetcher,
  getBeachByName,
  createReview,
  getReviews,
  deleteReview,
}
