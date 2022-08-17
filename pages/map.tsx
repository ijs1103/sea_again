import SearchBar from '@components/layout/SearchBar';
import SearchResult from '@components/layout/SearchResult';
import Modal from '@components/Modal';
import { KAKAO_MAP_URL } from '@utils/constants';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { BeachResponse } from '@utils/interfaces'
import MyMenu from '@components/layout/MyMenu';
import useGeolocation from '@hooks/useGeolocation';
import { useQuery } from '@tanstack/react-query';
import { getLikedBeach } from '@utils/axiosFunctions/ownApi'
import { redirect } from 'next/dist/server/api-utils';

declare global {
	interface Window {
		kakao: any;
	}
}

interface Position {
	lat: number
	lng: number
}

function Map() {
	const router = useRouter()
	const mapRef = useRef<HTMLDivElement | null>(null)
	const map = useRef<any>(null)
	const beachMapRef = useRef<HTMLDivElement | null>(null)
	const beachMap = useRef<any>(null)
	const likedMapRef = useRef<HTMLDivElement | null>(null)
	const likedMap = useRef<any>(null)
	const [mode, setMode] = useState<'search' | 'liked' | 'myArea'>()
	const [beach, setBeach] = useState<BeachResponse | null>(null)
	const [markers, setMarkers] = useState<any[]>([]);
	const [isModalOn, setIsModalOn] = useState(false)
	const handleModalClose = () => setIsModalOn(false)
	const { coordinates } = useGeolocation()
	const beachOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 클릭하여 <strong style='color: #5E17EB'>${beach?.sta_nm}</strong> 상세정보</span>`
	const myPosOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 여기가 <strong style='color: #5E17EB'>내 위치</strong></span>`
	const { data: likedBeach, isLoading, error } = useQuery<any>(['likedBeach', router.query.userId], () => getLikedBeach(router.query.userId), { enabled: !!router.query.userId })
	const lagLngArr: Position[] = useMemo(() => likedBeach?.map((cur: any) => { return { lat: +cur.beach.lat, lng: +cur.beach.lng } }), [likedBeach])

	// 하나의 마커를 생성하고 지도위에 표시하는 함수입니다
	const addMarker = (position: Position, map: any) => {
		const imageSrc = (mode === 'liked') ? './like_marker.png' : './custom_marker.png',
			imageSize = new window.kakao.maps.Size(40, 40),
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
			content: (mode === 'search') ? beachOverlay : (mode === 'myArea') ? myPosOverlay : null,
			position,
			xAnchor: -0.1,
			yAnchor: 2.5
		});
		(mode !== 'myArea') && window.kakao.maps.event.addListener(marker, 'click', function () {
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
		setMarkers(prev => [...prev, marker]);
	}

	useEffect(() => {
		if (!router.isReady) return
		if (router.query.data) {
			setMode('search')
			setBeach(JSON.parse(router.query.data as string))
		}
		if (router.query.userId) {
			setMode('liked')
		}
		if (router.asPath === '/map') setMode('myArea')
	}, [router.isReady])

	function drawMarkers(positions: Position[], bounds: any) {
		positions.forEach(cur => {
			const position = new window.kakao.maps.LatLng(cur.lat, cur.lng)
			addMarker(position, likedMap.current)
			bounds.extend(position)
		})
	}

	useEffect(() => {
		if (mode !== 'liked') return
		const script = document.createElement('script')
		script.src = KAKAO_MAP_URL
		document.head.appendChild(script)
		script.onload = () => {
			window.kakao.maps.load(() => {
				if (!likedMapRef.current) return
				const options = {
					center: new window.kakao.maps.LatLng(37.6463830000, 126.2284400000),
					level: 6,
					mapTypeId: window.kakao.maps.MapTypeId.ROADMAP
				};

				likedMap.current = new window.kakao.maps.Map(likedMapRef.current, options)

				const mapTypeControl = new window.kakao.maps.MapTypeControl();

				likedMap.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.BOTTOMLEFT);

				const zoomControl = new window.kakao.maps.ZoomControl();

				likedMap.current.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);
				markers.forEach(cur => cur.setMap(null));
				const bounds = new window.kakao.maps.LatLngBounds()
				drawMarkers(lagLngArr, bounds)
				likedMap.current.setBounds(bounds)
			})
		}
		return () => script.remove()
	}, [likedBeach])

	// 검색결과만 뿌려주는 지도 
	useEffect(() => {
		if (mode !== 'search') return
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
				markers.forEach(cur => cur.setMap(null));
				const position = new window.kakao.maps.LatLng(+beach?.lat, +beach?.lon)
				addMarker(position, beachMap.current)
				const bounds = new window.kakao.maps.LatLngBounds();
				bounds.extend(position)
				beachMap.current.setBounds(bounds);
			})
		}
		return () => script.remove()
	}, [beach])

	// 현재 유저의 위치만 뿌려주는 지도 
	useEffect(() => {
		if (mode !== 'myArea') return
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
				markers.forEach(cur => cur.setMap(null));
				const position = new window.kakao.maps.LatLng(+coordinates?.lat, +coordinates?.lng)
				addMarker(position, map.current)
				const bounds = new window.kakao.maps.LatLngBounds();
				bounds.extend(position)
				map.current.setBounds(bounds);
			})
		}
		return () => script.remove()
	}, [coordinates])

	return (
		<div className='relative'>
			{mode === 'search' &&
				<div
					ref={beachMapRef}
					className='shadow-2xl fixed top-0 left-0 w-full h-screen'
				></div>}
			{mode === 'liked' &&
				<div
					ref={likedMapRef}
					className='shadow-2xl fixed top-0 left-0 w-full h-screen'
				></div>}
			{mode === 'myArea' &&
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
