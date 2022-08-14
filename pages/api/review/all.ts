import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@utils/interfaces'
import client from '@libs/client'
import { parseCookies } from '@utils/index'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { beachName, limit, offset },
  } = req

  const reviews = await client.review.findMany({
    where: {
      beachName,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: +limit,
    skip: +offset,
  })

  return res.json({ ok: true, reviews })
}
