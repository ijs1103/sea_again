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
  console.log(name)
  // jwt 토큰 검증
  const token = parseCookies(req.headers.cookie)['token']
  if (!token) return res.json({ ok: false })
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)
  const beach = await client.beach.findUnique({
    where: {
      name: name?.toString(),
    },
    select: {
      id: true,
    },
  })
  const existingLike = await client.like.findFirst({
    where: {
      userId: id,
      beachId: beach?.id,
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
            id: beach?.id,
          },
        },
      },
    })
  }
  res.json({ ok: true })
}
