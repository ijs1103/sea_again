import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@utils/interfaces'
import { parseCookies } from '@utils/index'
import jwt from 'jsonwebtoken'
import client from '@libs/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { name },
  } = req
  // jwt 토큰 검증
  const token = parseCookies(req.headers.cookie)['token']
  if (!token) return res.json({ ok: false })
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)
  const existingLike = await client.like.findFirst({
    where: {
      userId: id,
      beachName: String(name),
    },
  })
  if (existingLike) {
    await client.like.delete({
      where: {
        id: existingLike.id,
      },
    })
  } else {
    await client.like.create({
      data: {
        user: {
          connect: {
            id,
          },
        },
        beach: {
          connect: {
            name: String(name),
          },
        },
      },
    })
  }
  res.json({ ok: true })
}
