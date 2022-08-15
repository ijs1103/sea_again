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
	const mapRef = useRef<HTMLDivElement | null>(null)
	const map = useRef<any>(null)
	const beachMapRef = useRef<HTMLDivElement | null>(null)
	const beachMap = useRef<any>(null)
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
		const imageSrc = './custom_marker.png',
			imageSize = new window.kakao.maps.Size(30, 40),
			imageOption = { offset: new window.kakao.maps.Point(27, 69) };

		const image = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
		const marker = new window.kakao.maps.Marker({
			position,
			map,
			image
		})
		const overlay = new window.kakao.maps.CustomOverlay({
			map,
			clickable: true,
			content: router.query.data ? beachOverlay : myPosOverlay,
			position,
			xAnchor: -0.1,
			yAnchor: 2.5
		});
		beach && window.kakao.maps.event.addListener(marker, 'click', function () {
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

	// 검색결과만 뿌려주는 지도 
	useEffect(() => {
		if (!beach) return
		const script = document.createElement('script')
		script.src = KAKAO_MAP_URL
		document.head.appendChild(script)
		script.onload = () => {
			window.kakao.maps.load(() => {
				if (!beachMapRef.current) return
				const options = {
					center: new window.kakao.maps.LatLng(coordinates?.lat, coordinates?.lng),
					level: 6,
					mapTypeId: window.kakao.maps.MapTypeId.ROADMAP
				};

				beachMap.current = new window.kakao.maps.Map(beachMapRef.current, options)

				const mapTypeControl = new window.kakao.maps.MapTypeControl();

				beachMap.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.BOTTOMLEFT);

				const zoomControl = new window.kakao.maps.ZoomControl();

				beachMap.current.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);

				const latLng = { lat: +beach?.lat, lng: +beach?.lon }
				addMarker(latLng, beachMap.current)
			})
		}
		return () => script.remove()
	}, [beach])

	// 현재 유저의 위치만 뿌려주는 지도 
	useEffect(() => {
		if (!coordinates) return
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

				const latLng = { lat: coordinates?.lat, lng: coordinates?.lng }
				addMarker(latLng, map.current)
			})
		}
		return () => script.remove()
	}, [coordinates])

	return (
		<div className='relative'>
			{beach ?
				<div
					ref={beachMapRef}
					className='shadow-2xl fixed top-0 left-0 w-full h-screen'
				></div>
				:
				<div
					ref={mapRef}
					className='shadow-2xl fixed top-0 left-0 w-full h-screen'
				></div>
			}
			<MyMenu />
			<SearchBar />
			{beach && <SearchResult keyword={beach.sta_nm} />}
			{beach && isModalOn && <Modal onModalClose={handleModalClose} beachData={beach} />}
		</div>

	);
}

export default Map;
