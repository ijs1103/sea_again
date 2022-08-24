import { getUser } from '@utils/fetchers/ownApi'
import { useQuery } from '@tanstack/react-query'
import { GetUserResponseType } from '@utils/interfaces'

function useUserInfo(enabledOption: null | boolean = null) {
  const { data: userData } = useQuery<GetUserResponseType>(
    ['getUser'],
    getUser,
    { enabled: enabledOption ?? true }
  )

  return { isLogin: userData?.isLogin, profile: userData?.user }
}

export default useUserInfo
