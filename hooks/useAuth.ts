import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function useAuth() {
  const router = useRouter()
  const token = getCookie('token')
  const authFetcher = () => {
    const res = axios.get('/api/user/validateUser', { params: { token } })
    return res
  }
  const { data, isLoading } = useQuery<any>(['auth'], authFetcher)
  useEffect(() => {
    if (!data?.ok) router.replace('/user/logIn')
  }, [data, router])
  return { profile: data?.user, loading: isLoading }
}

export default useAuth
