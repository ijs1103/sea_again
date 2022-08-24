import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { beachName, limit, offset },
  } = req
  const total_cnt = await client.review.count({
    where: {
      beachName: String(beachName),
    },
  })
  const isEnd = total_cnt <= Number(offset) + Number(limit)
  const reviews = await client.review.findMany({
    where: {
      beachName: String(beachName),
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
    take: Number(limit),
    skip: Number(offset),
  })
  return res.json({ reviews, isEnd, total_cnt })
}
