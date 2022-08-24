import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from '@utils/index'
import jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    id: number
  }
}
type HandlerType = (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) => void

export default function tokenValidator(handler: HandlerType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    // 쿠키를 받아와서 1) 토큰이 존재하는지 2) 토큰이 위변조 되었는지 이중 확인
    // cookies-next의 getCookie()가 제대로 쿠키를 받아오지 않는 에러가 있어서
    // 라이브러리 대신 util 함수로 쿠키를 받아왔습니다
    const accessToken = parseCookies(req.headers.cookie)['accessToken']
    const { id } = <jwt.UserIDJwtPayload>(
      jwt.verify(accessToken, process.env.SECRET_KEY as string)
    )

    if (!id)
      return res.status(401).json({ ok: false, error: '로그인을 해주세요.' })

    try {
      handler(req, res, id)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
  }
}
