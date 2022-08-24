import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { EditAccountType } from '@utils/interfaces'
import { editAccount } from '@utils/fetchers/ownApi'
import { ResponseType } from '@utils/interfaces'

function useEditProfile() {
  const {
    mutate: editProfile,
    isLoading,
    error,
  } = useMutation<AxiosResponse<ResponseType>, AxiosError, EditAccountType>(
    editAccount,
    {
      onSuccess: ({ data }) => {
        if (data.ok) {
          alert('프로필이 변경 되었습니다')
        } else {
          alert(data.error)
        }
      },
      onError: (error) => console.log(error),
    }
  )
  return {
    editProfile,
    isLoading,
    error,
  }
}

export default useEditProfile
