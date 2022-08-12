import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function useAuth() {
  const router = useRouter()
  const authFetcher = () => {
    const res = axios.get('/api/user/validateUser')
    return res
  }
  const { data, isLoading } = useQuery<any>(['auth'], authFetcher)
  useEffect(() => {
    if (router.isReady && !data?.ok) router.replace('/user/logIn')
  }, [data, router])

  return { profile: data?.user, loading: isLoading }
}

export default useAuth
