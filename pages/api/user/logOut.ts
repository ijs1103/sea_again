import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@utils/interfaces'
import { deleteCookie } from 'cookies-next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  deleteCookie('token', { req, res })
  res.json({
    ok: true,
  })
}
export default handler
