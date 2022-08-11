import axios from 'axios'
import { AccountType } from '@utils/interfaces'

const createAccount = async (newAccount: AccountType) => {
  const res = await axios.post('/api/user/signUp', newAccount)
  return res
}

export { createAccount }
