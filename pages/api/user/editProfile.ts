import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'
import bcrypt from 'bcrypt'
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { password, email } = req.body
  const newName = req.body?.name
  console.log(newName, password, email)
  if (!password || !email) return res.status(400).json({ ok: false })
  const existingUser = await client.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  })
  // 새로 입력한 비밀번호가 기존의 비밀번호와 같다면
  const isSamePw = await bcrypt.compare(
    password,
    existingUser?.password as string
  )
  if (isSamePw)
    return res.json({
      ok: false,
      error: '이전과 다른 비밀번호를 입력해주세요.',
    })
  const hashedPw = await bcrypt.hash(password, 10)
  // 유저가 Name을 변경 하려한다면 name도 변경, 그게 아니라면 password만 변경
  await client.user.update({
    where: {
      email,
    },
    data: {
      ...(newName && { name: newName }),
      password: hashedPw,
    },
  })

  res.json({
    ok: true,
  })
}

export default handler
