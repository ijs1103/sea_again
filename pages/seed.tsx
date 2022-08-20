import { getBeach } from '@utils/fetchers/publicApi'
import { SIDO_ARR } from '@utils/constants'
import React from 'react'

function setAllBeaches() {
	const setBeaches = async () => {
		const allBeach = []
		for (const sido of SIDO_ARR) {
			const beachArr = await getBeach(sido)
			allBeach.push(...beachArr)
		}
		// 중복 제거한 해수욕장 이름
		//const set = new Set(allBeach.map(cur => cur.sta_nm))
		fetch('/api/beach/seed', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ allBeach: allBeach })
		})
	}
	return (
		<button onClick={setBeaches}>모든 해수욕장 DB에 저장하기</button>
	)
}

export default setAllBeaches

