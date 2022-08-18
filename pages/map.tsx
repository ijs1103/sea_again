import SearchBar from '@components/layout/SearchBar';
import SearchResult from '@components/layout/SearchResult';
import Modal from '@components/Modal';
import { KAKAO_MAP_URL } from '@utils/constants';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { IAddMarker } from '@utils/interfaces'
import MyMenu from '@components/layout/MyMenu';
import useGeolocation from '@hooks/useGeolocation';
import { useQuery } from '@tanstack/react-query';
import { getLikedBeach } from '@utils/axiosFunctions/ownApi'
import { useAppSelector, useAppDispatch } from "@store/index"
import { setLikedBeachs, setLikedBeach } from '@store/slice/beachSlice';

declare global {
	interface Window {
		kakao: any;
	}
}

function Map() {
	const dispatch = useAppDispatch()
	const beachState = useAppSelector(state => state.beach)
	const router = useRouter()
	const mapRef = useRef<HTMLDivElement | null>(null)
	const map = useRef<any>(null)
	const beachMapRef = useRef<HTMLDivElement | null>(null)
	const beachMap = useRef<any>(null)
	const likedMapRef = useRef<HTMLDivElement | null>(null)
	const likedMap = useRef<any>(null)
	const [mode, setMode] = useState<'search' | 'liked' | 'myArea'>()
	const [markers, setMarkers] = useState<any[]>([]);
	const [isModalOn, setIsModalOn] = useState(false)
	const { coordinates } = useGeolocation()
	const { data, isSuccess, error } = useQuery<any>(['likedBeachs', router.query.userId], () => getLikedBeach(router.query.userId), { enabled: !!router.query.userId })
	const beachOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 클릭하여 <strong style='color: #5E17EB'>${beachState?.searchedBeach?.sta_nm}</strong> 상세정보</span>`
	const myPosOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 여기가 <strong style='color: #5E17EB'>내 위치</strong></span>`
	const handleModalClose = () => setIsModalOn(false)

	useEffect(() => {
		if (!data) return
		data.ok ? dispatch(setLikedBeachs(data.likedBeachs)) : alert(data.error)
	}, [data])
	const addMarker = ({ position, map, beachName }: IAddMarker) => {
		const imageSrc = (mode === 'liked') ? './like_marker.png' : './custom_marker.png',
			imageSize = new window.kakao.maps.Size((mode === 'liked') ? 40 : 30, 40),
			imageOption = { offset: new window.kakao.maps.Point(27, 69) };

		const image = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
		const marker = new window.kakao.maps.Marker({
			position,
			map,
			image
		})
		const likedOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:8px; width:50px; height:50px; background-color: #fff'>❤️<strong style={ color: gray }> ${beachName}</strong></span>`
		const overlay = new window.kakao.maps.CustomOverlay({
			map,
			clickable: true,
			content: (mode === 'search') ? beachOverlay : (mode === 'myArea') ? myPosOverlay : likedOverlay,
			position,
			xAnchor: (mode === 'liked') ? 0.5 : -0.1,
			yAnchor: (mode === 'liked') ? 3.5 : 2.5
		});
		// 검색한 해수욕장 데이터를 조회 할때에만 모달창을 On
		(mode === 'search') && window.kakao.maps.event.addListener(marker, 'click', function () {
			setIsModalOn(true)
		});
		if (mode === 'liked') overlay.setMap(null)
		window.kakao.maps.event.addListener(marker, 'mouseover', function () {
			(mode === 'liked') ? overlay.setMap(map) : overlay.setMap(null);
		});
		window.kakao.maps.event.addListener(marker, 'mouseout', function () {
			(mode === 'liked') ? overlay.setMap(null) : overlay.setMap(map);
		});
		marker.setMap(map);
		setMarkers(prev => [...prev, marker]);

	}

	useEffect(() => {
		if (!router.isReady) return
		if (beachState.searchedBeach) {
			setMode('search')
		} else {
			router.query.userId ? setMode('liked') : setMode('myArea')
		}

	}, [router.isReady])

	function drawMarkers(positions: any, bounds: any) {
		positions.forEach((cur: any) => {
			const position = new window.kakao.maps.LatLng(cur.lat, cur.lng)
			addMarker({ position, map: likedMap.current, beachName: cur.name })
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
				drawMarkers(data?.likedBeachs, bounds)
				likedMap.current.setBounds(bounds)
			})
		}
		return () => script.remove()
	}, [data])

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
				const lat = Number(beachState?.searchedBeach?.lat)
				const lng = Number(beachState?.searchedBeach?.lon)
				const position = new window.kakao.maps.LatLng(lat, lng)
				addMarker({ position, map: beachMap.current })
				const bounds = new window.kakao.maps.LatLngBounds();
				bounds.extend(position)
				beachMap.current.setBounds(bounds);
			})
		}
		return () => script.remove()
	}, [mode])

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
				addMarker({ position, map: map.current })
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
			{mode === 'liked' && beachState.likedBeachs && beachState.likedBeachs.length > 0 && <SearchResult type="liked" keyword={beachState?.likedBeachs?.length + ""} />}
			{mode === 'search' && beachState.searchedBeach && <SearchResult type="search" keyword={beachState.searchedBeach.sta_nm} />}
			{mode === 'search' && isModalOn && <Modal key='searchedModal' onModalClose={handleModalClose} beachData={beachState.searchedBeach} />}
		</div>

	);
}

export default Map;
