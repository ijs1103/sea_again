import SearchBar from '@components/layout/SearchBar';
import SearchResult from '@components/layout/SearchResult';
import Modal from '@components/Modal';
import { KAKAO_MAP_URL } from '@utils/constants';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BeachResponse } from '@utils/interfaces'
import MyMenu from '@components/layout/MyMenu';
import useGeolocation from '@hooks/useGeolocation';

declare global {
	interface Window {
		kakao: any;
	}
}

interface Pos {
	lat: number
	lng: number
}

function Map() {
	const router = useRouter()
	const mapRef = useRef<HTMLDivElement>(null);
	const map = useRef<any>(null);
	const [beach, setBeach] = useState<BeachResponse | null>(null)
	const [markers, setMarkers] = useState<any[]>([]);
	const [isModalOn, setIsModalOn] = useState(false)
	const handleModalClose = () => setIsModalOn(false)
	const { coordinates } = useGeolocation()
	const beachOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 클릭하여 <strong style='color: #5E17EB'>${beach?.sta_nm}</strong> 상세정보</span>`
	const myPosOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 여기가 <strong style='color: #5E17EB'>내 위치</strong></span>`

	// 하나의 마커를 생성하고 지도위에 표시하는 함수입니다
	const addMarker = useCallback((pos: Pos, map: any) => {
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
			clickable: true,
			content: router.query.data ? beachOverlay : myPosOverlay,
			position,
			xAnchor: -0.1,
			yAnchor: 2.5
		});
		// 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
		router.query.data && window.kakao.maps.event.addListener(marker, 'click', function () {
			setIsModalOn(true)
		});
		window.kakao.maps.event.addListener(marker, 'mouseover', function () {
			overlay.setMap(null);
		});
		window.kakao.maps.event.addListener(marker, 'mouseout', function () {
			overlay.setMap(map);
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
	}, [beach])

	useEffect(() => {
		router.isReady && router.query.data && setBeach(JSON.parse(router.query.data))
	}, [router.isReady, router.query.data])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = KAKAO_MAP_URL
		document.head.appendChild(script)
		script.onload = () => {
			window.kakao.maps.load(() => {
				if (!mapRef.current) return
				const options = {
					center: new window.kakao.maps.LatLng(coordinates?.lat, coordinates?.lng),
					level: 6,
					mapTypeId: window.kakao.maps.MapTypeId.ROADMAP
				};

				map.current = new window.kakao.maps.Map(mapRef.current, options)

				const mapTypeControl = new window.kakao.maps.MapTypeControl();

				map.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.BOTTOMLEFT);

				const zoomControl = new window.kakao.maps.ZoomControl();

				map.current.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);

				// 해수욕장을 검색한것이 아니라면 내 현재 위치를 지도에 표시한다
				const latLng = router.query.data ? { lat: +beach?.lat, lng: +beach?.lon } : { lat: coordinates?.lat, lng: coordinates?.lng }
				addMarker(latLng, map.current)
			})
		}
		return () => script.remove()
	}, [beach, coordinates])

	return (
		<div className='relative'>
			<div
				ref={mapRef}
				className='shadow-2xl fixed top-0 left-0 w-full h-screen'
			></div>
			<MyMenu />
			<SearchBar />
			{beach && <SearchResult keyword={beach.sta_nm} />}
			{beach && isModalOn && <Modal onModalClose={handleModalClose} beachData={beach} />}
		</div>

	);
}

export default Map;
