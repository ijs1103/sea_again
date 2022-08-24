import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@utils/interfaces'
import client from '@libs/client'
import tokenValidator from '@libs/tokenValidator'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
  userId: number
) {
  const {
    query: { name },
  } = req
  const existingLike = await client.like.findFirst({
    where: {
      userId,
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
            id: userId,
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

export default tokenValidator(handler)
