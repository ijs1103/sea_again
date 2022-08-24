import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
export function middleware(
  req: NextRequest,
  res: NextResponse,
  ev: NextFetchEvent
) {
  if (req?.ua?.isBot) {
    return new Response('봇을 사용하지 마세요.', { status: 403 })
  }
  // 토큰 검증 로직을 전부처리

  // 로그인일때 억세스, 리프레시 토큰 발금

  // 쿠키에 토큰이 없을때 리다이렉트

  //

  //api가 요청될때마다 redirect 일으키는것을 방지하는 조건문, _middleware의 적용범위에 api도 포함되기 때문이다
  if (!req.url.includes('/api')) {
    // return NextResponse.redirect('/enter')
  }

  // middle웨어에서 어떠한 값을 유저에게 보내려면 반드시 return 해야 한다.
  // return NextResponse.json({ok: true});
}
