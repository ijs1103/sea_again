import SearchBar from '@components/layout/SearchBar';
import SearchResult from '@components/layout/SearchResult';
import { KAKAO_MAP_URL } from '@utils/constants';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { BeachResponse } from '@utils/interfaces'

declare global {
	interface Window {
		kakao: any;
	}
}

interface Pos {
	lat: number
	lng: number
}


function App() {
	const router = useRouter()
	const mapRef = useRef<HTMLDivElement>(null);
	const map = useRef<any>(null);
	const [beach, setBeach] = useState<BeachResponse | null>(null)
	const [markers, setMarkers] = useState<any[]>([]);
	const overlayContent = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 클릭하여 <strong style='color: #5E17EB'>${beach?.sta_nm}</strong> 상세정보</span>`

	// 하나의 마커를 생성하고 지도위에 표시하는 함수입니다
	const addMarker = (pos: Pos, map: any) => {
		const position = new window.kakao.maps.LatLng(pos.lat, pos.lng)
		const imageSrc = './custom_marker.png', // 마커이미지의 주소입니다    
			imageSize = new window.kakao.maps.Size(30, 40), // 마커이미지의 크기입니다
			imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

		// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
		const image = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
		const marker = new window.kakao.maps.Marker({
			position,
			map,
			image
		})

		// 커스텀 오버레이를 생성하고 지도에 표시한다
		const overlay = new window.kakao.maps.CustomOverlay({
			map,
			clickable: true, // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정한다
			content: overlayContent,
			position, // 커스텀 오버레이를 표시할 좌표
			xAnchor: -0.1, // 컨텐츠의 x 위치
			yAnchor: 2.5 // 컨텐츠의 y 위치
		});
		// 오버레이 생성시 자동으로 표시가 되는데 이를 off하기 위함
		overlay.setMap(null);
		window.kakao.maps.event.addListener(marker, 'mouseover', function () {
			overlay.setMap(map);
		});
		window.kakao.maps.event.addListener(marker, 'mouseout', function () {
			overlay.setMap(null);
		});
		// 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
		window.kakao.maps.event.addListener(marker, 'click', function () {
			alert('마커를 클릭했습니다!');
		});
		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);
		// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
		const bounds = new window.kakao.maps.LatLngBounds();
		// LatLngBounds 객체에 좌표를 추가합니다
		bounds.extend(position)
		// LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
		map.setBounds(bounds);
		// 생성된 마커를 배열에 추가합니다
		setMarkers(prev => [...prev, marker]);
	}

	useEffect(() => {
		router.isReady && setBeach(JSON.parse(router.query.data))
	}, [router.isReady])

	useEffect(() => {
		if (!beach) return
		const script = document.createElement('script')
		script.src = KAKAO_MAP_URL
		document.head.appendChild(script)
		script.onload = () => {
			window.kakao.maps.load(() => {
				if (!mapRef.current) return
				const options = {
					center: new window.kakao.maps.LatLng(37.58757, 127.64815),
					level: 6,
					mapTypeId: window.kakao.maps.MapTypeId.ROADMAP
				};

				map.current = new window.kakao.maps.Map(mapRef.current, options)

				// 지도 타입 변경 컨트롤을 생성한다
				const mapTypeControl = new window.kakao.maps.MapTypeControl();

				// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
				map.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.BOTTOMLEFT);

				// 지도에 확대 축소 컨트롤을 생성한다
				const zoomControl = new window.kakao.maps.ZoomControl();

				// 지도의 우측에 확대 축소 컨트롤을 추가한다
				map.current.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);

				addMarker({ lat: +beach?.lat, lng: +beach?.lon }, map.current)
			})
		}

		return () => script.remove()
	}, [beach])

	return (
		<div className='relative'>
			<div
				ref={mapRef}
				className='shadow-2xl fixed top-0 left-0 w-full h-screen'
			></div>
			{beach && <SearchResult keyword={beach.sta_nm} />}
			<SearchBar />

		</div>

	);
}

export default App;
