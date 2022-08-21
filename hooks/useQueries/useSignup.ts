import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AccountType } from '@utils/interfaces'
import { createAccount } from '@utils/fetchers/ownApi'
import { useRouter } from 'next/router'
import { ResponseType } from '@utils/interfaces'

function useSignup() {
  const router = useRouter()
  const {
    mutate: signUp,
    isLoading,
    error,
  } = useMutation<ResponseType, AxiosError, AccountType>(createAccount, {
    onSuccess: ({ data }) => {
      if (data.ok) {
        alert('가입을 축하합니다!!')
        router.push('/user/logIn')
      } else {
        alert(data.error)
      }
    },
    onError: (error) => console.log(error),
  })
  return {
    signUp,
    isLoading,
    error,
  }
}

export default useSignup
