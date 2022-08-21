import { NextApiRequest, NextApiResponse } from 'next'
import client from '@libs/client'
import { ResponseType } from '@utils/interfaces'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { allBeach },
  } = req
  // 기존 해수욕장 데이터 모두 제거
  await client.beach.deleteMany({})
  // planet scale 무료계정을 사용하고 있어서, 다수의 db 데이터를 create 할때 제약이 있으므로 1초간의 텀을 두었습니다
  for (const beach of allBeach) {
    setTimeout(
      async () =>
        await client.beach.create({
          data: {
            name: String(`${beach.gugun_nm} ${beach.sta_nm}`),
            lat: beach.lat,
            lng: beach.lon,
            sido_nm: beach.sido_nm,
          },
        }),
      1000
    )
  }
  return res.json({ ok: true })
}

export default handler
