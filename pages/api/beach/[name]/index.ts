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
  const beach = await client.beach.findUnique({
    where: {
      name: name?.toString(),
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
      reviews: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
  const isLiked = Boolean(
    await client.like.findFirst({
      where: {
        userId,
        beachName: String(name),
      },
    })
  )
  res.json({ ok: true, beach, isLiked })
}

export default tokenValidator(handler)
