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
  // jwt 토큰 검증
  const token = parseCookies(req.headers.cookie)['token']
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)

  const beach = await client.beach.findUnique({
    where: {
      name: name?.toString(),
    },
  })
  // 좋아요 여부
  const isLiked = Boolean(
    await client.like.findFirst({
      where: {
        userId: id,
        beachId: beach?.id,
      },
    })
  )
  res.json({ ok: true, beach, isLiked })
}
