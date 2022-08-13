import axios from 'axios'
import { AccountType, EditAccountType, LoginForm } from '@utils/interfaces'

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

export { authFetcher, createAccount, userLogIn, editAccount, userLogOut }
