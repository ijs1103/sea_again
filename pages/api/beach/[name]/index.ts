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
    query: { name },
  } = req
  const beach = await client.beach.findUnique({
    where: {
      name: name?.toString(),
    },
    include: {
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
  // jwt 토큰 검증
  const token = parseCookies(req.headers.cookie)['token']
  // 로그인 하지 않았으면 isLiked(좋아요 여부) 리턴하지 않음
  if (!token) return res.json({ ok: true, beach })
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)
  // 좋아요 여부
  const isLiked = Boolean(
    await client.like.findFirst({
      where: {
        userId: id,
        beachName: String(name),
      },
    })
  )
  res.json({ ok: true, beach, isLiked })
}
