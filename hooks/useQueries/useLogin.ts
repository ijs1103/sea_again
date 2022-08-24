import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { LoginForm } from '@utils/interfaces'
import { userLogIn } from '@utils/fetchers/ownApi'
import { useRouter } from 'next/router'
import { ResponseType } from '@utils/interfaces'

function useLogin() {
  const router = useRouter()
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation<AxiosResponse<ResponseType>, AxiosError, LoginForm>(
    userLogIn,
    {
      onSuccess: ({ data }) => {
        if (data.ok) {
          alert('로그인 성공!!')
          router.push('/map')
        } else {
          alert(data.error)
        }
      },
      onError: (error) => console.log(error),
    }
  )
  return {
    login,
    isLoading,
    error,
  }
}

export default useLogin
