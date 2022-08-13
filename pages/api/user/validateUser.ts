import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'
import jwt from 'jsonwebtoken'
import { parseCookies } from '@utils/index'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 쿠키를 받아와서 토큰이 존재하는지 확인
  // cookies-next의 getCookie()가 제대로 쿠키를 받아오지 않는 에러가 있어서
  // 라이브러리 대신 util 함수로 쿠키를 받아왔습니다
  const token = parseCookies(req.headers.cookie)['token']
  // 쿠키가 없을때 처리
  if (!token) return res.json({ ok: false })
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)
  const user = await client.user.findUnique({ where: { id } })
  if (!user) return res.json({ ok: false })
  return res.json({ ok: true, user })
}

export default handler
