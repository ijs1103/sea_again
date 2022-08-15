import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@utils/interfaces'
import client from '@libs/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req
  const user = await client.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      likes: {
        include: {
          beach: {
            select: {
              name: true,
              lat: true,
              lng: true,
            },
          },
        },
      },
    },
  })

  return res.json({ ok: true, user })
}
