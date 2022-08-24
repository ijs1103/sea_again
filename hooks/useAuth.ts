import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { authFetcher } from '@utils/fetchers/ownApi'
import { ResponseType } from '@utils/interfaces'

function useAuth(mode: 'getProfile' | 'auth') {
  const router = useRouter()
  const { data, isLoading } = useQuery<ResponseType>(['auth'], authFetcher)
  useEffect(() => {
    if (mode === 'auth' && data && !data.ok && router.isReady)
      router.replace('/user/logIn')
  }, [data, router])

  return {
    profile: data?.user,
    loading: isLoading,
    isLogin: data?.ok,
  }
}

export default useAuth
