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
    body: { reviewId },
  } = req
  const token = parseCookies(req.headers.cookie)['token']
  const { id } = jwt.verify<any>(token, process.env.SECRET_KEY as string)
  const myReview = await client.review.findFirst({
    where: {
      id: reviewId,
      userId: id,
    },
  })
  // 내 후기가 아닌경우 삭제 방지 로직
  if (!myReview) return res.json({ ok: false, error: '삭제할 권한이 없습니다' })
  try {
    await client.review.delete({
      where: {
        id: reviewId,
      },
    })
  } catch (error) {
    return res.json({ ok: false, error })
  }
  res.json({
    ok: true,
  })
}

export default handler
