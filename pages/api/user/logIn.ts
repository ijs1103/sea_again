import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { password, email } = req.body
  if (!password || !email) return res.status(400).json({ ok: false })
  // 해당 email로 가입한 유저가 있는지 확인
  const user = await client.user.findUnique({ where: { email } })
  if (!user) return res.json({ ok: false, error: '계정이 존재하지 않습니다.' })
  const isPwCorrect = await bcrypt.compare(password, user.password)
  if (!isPwCorrect)
    return res.json({ ok: false, error: '올바른 비밀번호가 아닙니다.' })
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string)
  setCookie('token', token, {
    req,
    res,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })
  res.json({
    ok: true,
    token,
  })
}

export default handler
