import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@utils/interfaces'
import client from '@libs/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const topTenBeach = await client.beach.findMany({
    skip: 0,
    take: 10,
    orderBy: {
      likes: {
        _count: 'desc',
      },
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
  })
  res.json({ ok: true, topTenBeach })
}
