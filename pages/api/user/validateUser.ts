import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'
import tokenValidator from '@libs/tokenValidator'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
  userId: number
) {
  const user = await client.user.findUnique({ where: { id: userId } })
  if (!user) return res.json({ ok: false })
  return res.json({ ok: true, user })
}

export default tokenValidator(handler)
