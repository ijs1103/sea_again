import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'
import jwt from 'jsonwebtoken'
import { parseCookies } from '@utils/index'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { payload, beachName },
  } = req
  const token = parseCookies(req.headers.cookie)['token']
  // 쿠키가 없을때 처리
  if (!token) return res.json({ ok: false })
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)
  const beach = await client.beach.findUnique({
    where: {
      name: beachName,
    },
  })
  await client.review.create({
    data: {
      payload,
      user: {
        connect: {
          id,
        },
      },
      beach: {
        connect: {
          id: beach?.id,
        },
      },
    },
  })
  res.json({
    ok: true,
  })
}

export default handler
