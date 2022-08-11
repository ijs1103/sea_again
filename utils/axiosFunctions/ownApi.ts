import axios from 'axios'
import { AccountType, LoginForm } from '@utils/interfaces'

const createAccount = async (newAccount: AccountType) => {
  const res = await axios.post('/api/user/signUp', newAccount)
  return res
}
const userLogIn = async (logInParams: LoginForm) => {
  const res = await axios.post('/api/user/logIn', logInParams)
  return res
}
export { createAccount, userLogIn }
