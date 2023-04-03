
# 🐬 씨어게인

## 🧩 개요

지역별 해수욕장 정보를 조회 할 수 있는 커뮤니티 입니다. 

## 🛠 사용기술

<img src="https://img.shields.io/badge/Next.js-black?style=flat&&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&e&logo=Typescript&logoColor=white"/> 
<img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat&logo=Redux&logoColor=black"/>
<img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=React Query&logoColor=black"/>
<img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=Prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat&logo=Amazon S3&logoColor=black"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=black"/>
<img src="https://img.shields.io/badge/PlanetScale-000000?style=flat&logo=PlanetScale&logoColor=white"/>

## 📕 기능목록

|                                  기능                                                                                          |
| :----------------------------------------------------------------------: |
|               accessToken 로그인 / 회원가입               | 
해수욕장 정보 조회 (기상청 api, 해수욕장 정보 api, 수질 api, 모래 api) | 
해수욕장 별 좋아요 / 댓글 / 공유 기능 | 
좋아요 한 해수욕장 조회 | 
인기 해수욕장 조회 |
시도별 해수욕장 검색 | 
마이페이지 - 정보 조회 및 수정 |                        


[상세 기능 명세](https://plum-puppet-fa1.notion.site/5528dc5ffe4742db9e90e27d9b997f68?v=c19f98013dce49ee99f2b2668d4240d4)

## 🤔 배운 내용 || 고민한 내용

✔️ 기획 및 디자인

기획부터 디자인까지 피그마를 통해 UI를 작성 하였습니다. 반응형 페이지입니다.

✔️ api

공공 api를 심도있게 다루었고 (데이터 파싱, 엣지 케이스 핸들링) 카카오 맵 api의 여러 기능을 다루어 보았습니다

✔️ react-query 사용

react-query의 다양한 기능을 활용하였고 useQuery, useMutation 메소드를 커스텀 훅으로 리팩토링 하였습니다

✔️ CORS 에러 

공공 api 사용시 개발, 배포 환경 모두에서 발생하는 CORS에러를 Proxy 서버로 우회하는 방식으로 해결 하였습니다

✔️ 트러블 슈팅 기록

공공 api, aws-s3 세팅, CORS 에러등 자주 접하는 상황을 기록해둠으로써 다음번에는 당황하지 않고 에러 핸들링을 할 수 있습니다

✔️ 최적화 

1) next.js에서 제공하는 next/image를 활용하여 이미지 최적화를 수행하였습니다.

2) 렌더링 최적화 => useCallBack, useMemo, memo의 hook을 적재적소에 적용하였습니다.

3) SEO 점수 100점을 달성하였습니다.


## 🔗 링크

[기획, 기능명세, 트러블 슈팅, 최적화 관련 작성 페이지](https://plum-puppet-fa1.notion.site/28692385c13142c2bd20f532e10aed33)

[시연 영상](https://youtu.be/FazXZ5xKjm4)





