import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { userLogOut } from '@utils/fetchers/ownApi'
import { ResponseType } from '@utils/interfaces'

function useLogout() {
  const {
    mutate: logOut,
    isLoading,
    error,
  } = useMutation<ResponseType, AxiosError>(userLogOut, {
    onSuccess: ({ data }) => {
      if (data.ok) {
        alert('로그아웃 되었습니다!')
        document.location.href = '/map'
      } else {
        alert(data.error)
      }
    },
    onError: (error) => console.log(error),
  })

  return {
    logOut,
    isLoading,
    error,
  }
}

export default useLogout
