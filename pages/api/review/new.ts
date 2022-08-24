import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'
import tokenValidator from '@libs/tokenValidator'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
  userId: number
) {
  const {
    body: { payload, beachName },
  } = req
  const review = await client.review.create({
    data: {
      payload: String(payload),
      user: {
        connect: {
          id: userId,
        },
      },
      beach: {
        connect: {
          name: beachName,
        },
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })
  res.json({
    ok: true,
    review,
  })
}

export default tokenValidator(handler)
