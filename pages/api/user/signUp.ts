import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'
import bcrypt from 'bcrypt'
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, password, email } = req.body
  console.log(name, password, email)
  if (!name || !password || !email) return res.status(400).json({ ok: false })
  // 해당 email로 가입한 유저가 있는지 확인
  const existingUser = await client.user.findUnique({
    where: {
      email,
    },
  })
  if (existingUser)
    return res.json({
      ok: false,
      error: '해당 이메일은 현재 사용중입니다.',
    })
  // 비밀번호를 해쉬화 하여 db에 저장
  const hashedPw = await bcrypt.hash(password, 10)
  await client.user.create({
    data: {
      name,
      password: hashedPw,
      email,
    },
  })
  res.json({
    ok: true,
  })
}

export default handler
