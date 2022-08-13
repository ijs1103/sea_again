import { dehydrate, useQuery, QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ResponseType } from '@utils/interfaces'
import { authFetcher } from '@utils/axiosFunctions/ownApi'

function useAuth(mode: 'getProfile' | 'auth') {
  const router = useRouter()
  const { data, isLoading } = useQuery<any>(['auth'], authFetcher)
  useEffect(() => {
    if (mode === 'auth' && data && !data.data.ok && router.isReady)
      router.replace('/user/logIn')
  }, [data, router])

  return {
    profile: data?.data?.user,
    loading: isLoading,
    isLogin: data?.data?.ok,
  }
}

export default useAuth

// export async function getServerSideProps() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery(['auth'], authFetcher)

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
