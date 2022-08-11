import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'
import jwt from 'jsonwebtoken'
import { getCookie } from 'cookies-next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 쿠키를 받아와서 유저가 존재하는지 확인
  const token = getCookie('token')
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)
  const user = await client.user.findUnique({ where: { id } })
  if (!user) return res.json({ ok: false })
  return res.json({ ok: true, user })
}

export default handler
