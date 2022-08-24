/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { parseCookies } from '@utils/index'
import jwt from 'jsonwebtoken'
import { GetUserResponseType } from '@utils/interfaces'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserResponseType>
) {
  const accessToken = parseCookies(req.headers.cookie)['accessToken']
  if (!accessToken) return res.json({ isLogin: false })
  const { id } = jwt.verify<any>(accessToken, process.env.SECRET_KEY as string)
  const user = await client.user.findUnique({ where: { id } })
  return res.json({ isLogin: true, user })
}

export default handler
