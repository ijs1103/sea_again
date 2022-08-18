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
  if (!user?.likes.length)
    return res.json({ ok: false, error: '찜한 해수욕장이 없습니다' })
  const likedBeachs = user?.likes.map((cur) => {
    return { name: cur.beach.name, lat: cur.beach.lat, lng: cur.beach.lng }
  })
  return res.json({ ok: true, likedBeachs })
}
