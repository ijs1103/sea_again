



import React, { useEffect, useRef, useState } from 'react';

declare global {
	interface Window {
		kakao: any;
	}
}


function App() {
	const mapRef = useRef<HTMLDivElement>(null);
	const [markerList, setMarkerList] = useState<any[]>([]);
	const map = useRef<any>(null);

	useEffect(() => {

		const script = document.createElement('script')

		script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=d5a96e8908f8bbad4cfd0abd9ae7cb72&autoload=false'

		document.head.appendChild(script)

		script.onload = () => {
			window.kakao.maps.load(() => {
				if (mapRef.current) {
					const options = {
						center: new window.kakao.maps.LatLng(37.58757, 127.64815),
						level: 12,
						mapTypeId: window.kakao.maps.MapTypeId.ROADMAP
					};

					map.current = new window.kakao.maps.Map(mapRef.current, options)

					// 지도 타입 변경 컨트롤을 생성한다
					const mapTypeControl = new window.kakao.maps.MapTypeControl();

					// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
					map.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);

					// 지도에 확대 축소 컨트롤을 생성한다
					const zoomControl = new window.kakao.maps.ZoomControl();

					// 지도의 우측에 확대 축소 컨트롤을 추가한다
					map.current.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

					// 지도에 마커를 생성하고 표시한다
					const marker = new window.kakao.maps.Marker({
						position: new window.kakao.maps.LatLng(37.56628, 126.96992), // 마커의 좌표
						map: map.current // 마커를 표시할 지도 객체
					});

					// 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
					window.kakao.maps.event.addListener(marker, 'click', function () {
						alert('마커를 클릭했습니다!');
					});

					// 커스텀 오버레이를 생성하고 지도에 표시한다
					const customOverlay = new window.kakao.maps.CustomOverlay({
						map: map.current,
						clickable: true, // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정한다
						content: '<div style="padding:0 5px;background:#fff;">HTML코드를 입력해주세요 :D</div>',
						position: new window.kakao.maps.LatLng(37.56628, 126.96992), // 커스텀 오버레이를 표시할 좌표
						xAnchor: 0.5, // 컨텐츠의 x 위치
						yAnchor: 0 // 컨텐츠의 y 위치
					});
				}
			})
		}

		return () => script.remove()
	}, [])

	return (
		<div
			ref={mapRef}
			className='fixed top-0 left-0 w-full h-screen'
		></div>

	);
}

export default App;
