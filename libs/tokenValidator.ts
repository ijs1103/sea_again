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
    // cookies-next의 getCookie()가 제대로 쿠키를 받아오지 않는 에러가 있어서 라이브러리 대신 util 함수로 쿠키를 받아왔습니다
    const accessToken = parseCookies(req.headers.cookie)['accessToken']
    // 토큰이 없으면 401 unAuthorized 처리
    if (!accessToken)
      return res.status(401).json({ ok: false, error: '로그인을 해주세요.' })
    const { id } = <jwt.UserIDJwtPayload>(
      jwt.verify(accessToken, process.env.SECRET_KEY as string)
    )
    // jwt 검증의 결과값이 존재하지 않을떄, 즉 토큰의 위변조가 일어났을 때 403 Forbidden 처리
    if (!id)
      return res.status(403).json({ ok: false, error: '로그인을 해주세요.' })

    try {
      handler(req, res, id)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
  }
}
