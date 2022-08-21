import SearchBar from '@components/layout/SearchBar';
import SearchResult from '@components/layout/SearchResult';
import Modal from '@components/Modal';
import { KAKAO_MAP_URL } from '@utils/constants';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { IAddMarker } from '@utils/interfaces'
import MyMenu from '@components/layout/MyMenu';
import useGeolocation from '@hooks/useGeolocation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios'

import { getLikedBeach, toggleLikeFetcher } from '@utils/fetchers/ownApi'
import { useAppSelector, useAppDispatch } from "@store/index"
import { setLikedBeachs, fetchSelected, fetchTopTen } from '@store/slice/beachSlice';
import ToggleButton from '@components/ToggleButton';

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
	const topTenMapRef = useRef<HTMLDivElement | null>(null)
	const topTenMap = useRef<any>(null)
	const [mode, setMode] = useState<'search' | 'liked' | 'myArea' | 'topTen'>('myArea')
	const [markers, setMarkers] = useState<any[]>([]);
	const [overlays, setOverlays] = useState<any[]>([]);
	const [isModalOn, setIsModalOn] = useState(false)
	const { coordinates } = useGeolocation()
	const { data, isSuccess, error } = useQuery<any>(['likedBeachs', router.query.userId], () => getLikedBeach(router.query.userId), { enabled: !!router.query.userId })
	const { mutate: toggleLike } = useMutation<ResponseType, AxiosError, string>(toggleLikeFetcher)
	const [rePaintFlag, setRePaintFlag] = useState(false)
	const handleModalClose = () => setIsModalOn(false)
	const removeTopTen = () => {
		markers.forEach(cur => cur.setMap(null))
		overlays.forEach(cur => cur.setMap(null))
	}
	// 좋아요 한 해수욕장이 있으면 전역상태로 저장 , 좋아요 한 해수욕장이 없으면 alert 표시후 뒤로가기 
	useEffect(() => {
		if (!data) return
		if (data.ok) {
			dispatch(setLikedBeachs(data.likedBeachs))
		} else {
			alert(data.error)
			router.back()
		}
	}, [data])
	useEffect(() => {
		if (mode !== 'topTen') return
		dispatch(fetchTopTen())
	}, [mode])
	const addMarker = ({ position, map, beachName, rank, sido_nm }: IAddMarker) => {
		const imageSrc = (mode === 'liked') ? './like_marker.png' : './custom_marker.png',
			imageSize = new window.kakao.maps.Size((mode === 'liked') ? 40 : 30, 40),
			imageOption = { offset: new window.kakao.maps.Point(27, 69) };

		const image = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
		const marker = new window.kakao.maps.Marker({
			position,
			map,
			image
		})
		const beachOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 클릭하여 <strong style='color: #5E17EB'>${beachState?.searchedBeach?.sta_nm}</strong> 상세정보</span>`
		const myPosOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:10px; width:100px; height:100px; background-color: #fff'>← 여기가 <strong style='color: #5E17EB'>내 위치</strong></span>`
		const likedOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:8px; width:50px; height:50px; background-color: #fff'>❤️<strong> ${beachName}</strong></span>`
		const topTenOverlay = `<span style='font-size:14px; color: #353B48; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);  border-radius:10px; padding:6px; width:50px; height:50px; background-color: #fff'><strong style='color: #5E17EB'>${rank}위</strong> ${beachName}</span>`
		const overlay = new window.kakao.maps.CustomOverlay({
			map,
			clickable: true,
			content: (mode === 'search') ? beachOverlay : (mode === 'myArea') ? myPosOverlay : (mode === 'liked') ? likedOverlay : topTenOverlay,
			position,
			xAnchor: (mode === 'liked') ? 0.5 : 0,
			yAnchor: (mode === 'liked') ? 3.5 : (mode === 'topTen') ? 3.1 : 3.5
		});
		// 검색한 해수욕장 데이터를 조회 할때에만 모달창에 클릭 이벤트를 할당합니다
		(mode === 'search') && window.kakao.maps.event.addListener(marker, 'click', function () {
			setIsModalOn(true)
		});
		// 찜한 해수욕장 마커를 클릭하면 찜해제 기능 
		(mode === 'liked') && window.kakao.maps.event.addListener(marker, 'click', function () {
			if (confirm(`정말로 ${beachName}을(를) 좋아요 해제 하시겠습니까?`)) {
				beachName && toggleLike(beachName)
				window.location.href = router.asPath
			}
		});
		// 검색한 해수욕장 데이터를 조회 할때에만 모달창에 클릭 이벤트를 할당합니다
		(mode === 'topTen') && window.kakao.maps.event.addListener(marker, 'click', function () {
			const gugun_nm = beachName?.split(' ')[0]
			const sta_nm = beachName?.split(' ')[1]
			if (!sido_nm || !gugun_nm || !sta_nm) return
			console.log(sido_nm, gugun_nm, sta_nm)
			dispatch(fetchSelected({ sido_nm, gugun_nm, sta_nm }))
			setMode('search')
			setIsModalOn(true)
		});
		if (['liked'].includes(mode)) overlay.setMap(null)
		mode !== 'topTen' && window.kakao.maps.event.addListener(marker, 'mouseover', function () {
			(['liked'].includes(mode)) ? overlay.setMap(map) : overlay.setMap(null);
		});
		mode !== 'topTen' && window.kakao.maps.event.addListener(marker, 'mouseout', function () {
			(['liked'].includes(mode)) ? overlay.setMap(null) : overlay.setMap(map);
		});
		marker.setMap(map);
		setMarkers(prev => [...prev, marker]);
		setOverlays(prev => [...prev, overlay])
	}

	useEffect(() => {
		if (!router.isReady) return
		if (beachState.searchedBeach) {
			setMode('search')
		} else {
			router.query.userId ? setMode('liked') : setMode('myArea')
		}

	}, [router.isReady])

	function drawMarkers(positions: any, bounds: any, map: any) {
		positions.forEach((cur: any, idx: number) => {
			const position = new window.kakao.maps.LatLng(cur.lat, cur.lng)
			addMarker({ position, map, beachName: cur.name, rank: idx + 1, sido_nm: cur.sido_nm })
			bounds.extend(position)
		})
	}
	// 유저들의 좋아요 기준 top 10의 해수욕장들을 표시하는 지도
	useEffect(() => {
		if (mode !== 'topTen' || !beachState.topTen || !rePaintFlag) return
		const script = document.createElement('script')
		script.src = KAKAO_MAP_URL
		document.head.appendChild(script)
		script.onload = () => {
			window.kakao.maps.load(() => {
				if (!topTenMapRef.current) return
				const options = {
					center: new window.kakao.maps.LatLng(37.6463830000, 126.2284400000),
					level: 6,
					mapTypeId: window.kakao.maps.MapTypeId.ROADMAP
				};

				topTenMap.current = new window.kakao.maps.Map(topTenMapRef.current, options)

				const mapTypeControl = new window.kakao.maps.MapTypeControl();

				topTenMap.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.BOTTOMLEFT);

				const zoomControl = new window.kakao.maps.ZoomControl();

				topTenMap.current.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);
				markers.forEach(cur => cur.setMap(null));
				const bounds = new window.kakao.maps.LatLngBounds()
				drawMarkers(beachState?.topTen, bounds, topTenMap.current)
				topTenMap.current.setBounds(bounds)
			})
		}
		return () => script.remove()
	}, [mode, beachState?.topTen, rePaintFlag])

	// 로그인한 유저가 좋아요한 해수욕장들을 표시하는 지도
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
				drawMarkers(data?.likedBeachs, bounds, likedMap.current)
				likedMap.current.setBounds(bounds)
			})
		}
		return () => script.remove()
	}, [data])

	// 해수욕장 검색 결과만 표시하는 지도 
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

	// 현재 유저의 위치만 표시하는 지도 
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
				const position = new window.kakao.maps.LatLng(coordinates?.lat, coordinates?.lng)
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
					className='fixed top-0 left-0 w-full h-screen shadow-2xl'
				></div>}
			{mode === 'liked' &&
				<div
					ref={likedMapRef}
					className='fixed top-0 left-0 w-full h-screen shadow-2xl'
				></div>}
			{mode === 'myArea' &&
				<div
					ref={mapRef}
					className='fixed top-0 left-0 w-full h-screen shadow-2xl'
				></div>
			}
			{mode === 'topTen' &&
				<div
					ref={topTenMapRef}
					className='fixed top-0 left-0 w-full h-screen shadow-2xl'
				></div>
			}
			<MyMenu />
			<SearchBar />
			<ToggleButton setRePaintFlag={() => setRePaintFlag(prev => !prev)} removeTopTen={removeTopTen} setTopTen={() => setMode('topTen')} />
			{mode === 'topTen' && <SearchResult type="topTen" keyword='좋아요 TOP 10' />}
			{mode === 'liked' && beachState.likedBeachs && beachState.likedBeachs.length > 0 && <SearchResult type="liked" keyword={beachState?.likedBeachs?.length + ""} />}
			{mode === 'search' && beachState.searchedBeach && <SearchResult type="search" keyword={beachState.searchedBeach.sta_nm} />}
			{mode === 'search' && isModalOn && <Modal onModalClose={handleModalClose} beachData={beachState.searchedBeach} />}
		</div>

	);
}

export default Map;
