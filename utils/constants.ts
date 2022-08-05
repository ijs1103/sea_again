const WEATHER_BASE_URL = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
// const PTY = {
// 	0: '없음',
// 	1: '비',
// 	2: '비/눈',
// 	3: '눈',
// 	5: '빗방울',
// 	6: '빗방울 눈날림',
// 	7: '눈날림'
// } as const;
// const SKY = {
// 	1: '맑음',
// 	3: '구름많음',
// 	4: '흐림'
// } as const;

const W_CATEGORY = {
	'PTY': {
		0: '없음',
		1: '비',
		2: '비/눈',
		3: '눈',
		5: '빗방울',
		6: '빗방울 눈날림',
		7: '눈날림'
	},
	'SKY': {
		1: '맑음',
		3: '구름많음',
		4: '흐림'
	}
} as const;
export { WEATHER_BASE_URL, W_CATEGORY }