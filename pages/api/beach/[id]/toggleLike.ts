import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@utils/interfaces'
import { parseCookies } from '@utils/index'
import jwt from 'jsonwebtoken'
import client from '@libs/client'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id: beachId },
  } = req

  const token = parseCookies(req.headers.cookie)['token']
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)
  const existingLike = await client.like.findFirst({
    where: {
      userId: id,
      beachId: +beachId.toString(),
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
            id: +beachId.toString(),
          },
        },
      },
    })
  }
  res.json({ ok: true })
}
