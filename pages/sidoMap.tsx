import React, { useEffect, useRef, useState } from 'react';
declare global {
	interface Window {
		kakao: any;
	}
}
type Positions = { lat: number; lng: number }[]

function App() {
	const mapRef = useRef<HTMLDivElement>(null);
	// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
	const [markers, setMarkers] = useState<any[]>([]);
	const map = useRef<any>(null);
	const latLngList = [{ lat: 37.7766180, lng: 128.9075910 }, { lat: 37.7965180, lng: 128.9174910 }, { lat: 37.7964180, lng: 128.9173910 }, { lat: 37.7963180, lng: 128.9172910 }, { lat: 37.7962180, lng: 128.9171910 }]



	// 하나의 마커를 생성하고 지도위에 표시하는 함수입니다
	function addMarker(position: any, map: any) {

		// 마커를 생성합니다
		const marker = new window.kakao.maps.Marker({
			position
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);

		// 생성된 마커를 배열에 추가합니다
		setMarkers(prev => [...prev, marker]);
	}

	// 위도 경도값으로 마커 그리기
	function drawMarkers(positions: Positions, bounds: any) {
		positions.forEach(cur => {
			const position = new window.kakao.maps.LatLng(cur.lat, cur.lng)
			addMarker(position, map.current)
			// LatLngBounds 객체에 좌표를 추가합니다
			bounds.extend(position)
		})
	}

	// 마커 삭제하기
	useEffect(() => {
		//markers.forEach(cur => cur.setMap(null));
	}, [markers])

	useEffect(() => {
		const script = document.createElement('script')

		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`

		document.head.appendChild(script)

		script.onload = () => {
			window.kakao.maps.load(() => {
				if (mapRef.current) {
					const options = {
						center: new window.kakao.maps.LatLng(35.6766180, 126.8075910),
						level: 12,
					};
					map.current = new window.kakao.maps.Map(mapRef.current, options)
					// 여기까지 지도 초기화



					// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
					const bounds = new window.kakao.maps.LatLngBounds();
					drawMarkers(latLngList, bounds)
					// LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
					map.current.setBounds(bounds);
				}
			})
		}
		return () => script.remove()
	}, [])

	return (
		<>
			<div
				ref={mapRef}
				className='fixed top-0 left-0 w-full h-screen'
			></div>
		</>
	);
}

export default App;
