import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getLikedBeach } from '@utils/axiosFunctions/ownApi'
import { KAKAO_MAP_URL } from '@utils/constants';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { BeachResponse } from '@utils/interfaces'
import MyMenu from '@components/layout/MyMenu';
import useGeolocation from '@hooks/useGeolocation';


interface Position {
	lat: number
	lng: number
}
function LikedBeach() {
	const router = useRouter()
	const mapRef = useRef<HTMLDivElement>(null)
	const map = useRef<any>(null)
	const [markers, setMarkers] = useState<any[]>([]);
	const { data, isLoading, error } = useQuery<any>(['likedBeach', router.query.id], () => getLikedBeach(router.query.id), { enabled: !!router.query.id })
	console.log(data)
	const lagLngArr: Position[] = useMemo(() => data?.map((cur: any) => { return { lat: +cur.beach.lat, lng: +cur.beach.lng } }), [data])

	// 하나의 마커를 생성하고 지도위에 표시하는 함수입니다
	function addMarker(position: Position, map: any) {
		const imageSrc = '../../like_marker.png',
			imageSize = new window.kakao.maps.Size(40, 40),
			imageOption = { offset: new window.kakao.maps.Point(27, 69) };

		const image = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
		const marker = new window.kakao.maps.Marker({
			position,
			map,
			image
		})
		marker.setMap(map);

		setMarkers(prev => [...prev, marker]);
	}

	// 위도 경도값으로 마커 그리기
	function drawMarkers(positions: Position[], bounds: any) {
		positions.forEach(cur => {
			const position = new window.kakao.maps.LatLng(cur.lat, cur.lng)
			addMarker(position, map.current)
			bounds.extend(position)
		})
	}
	useEffect(() => {
		if (!lagLngArr) return
		const script = document.createElement('script')
		script.src = KAKAO_MAP_URL
		document.head.appendChild(script)
		script.onload = () => {
			window.kakao.maps.load(() => {
				if (!mapRef.current) return
				const options = {
					center: new window.kakao.maps.LatLng(37.6463830000, 126.2284400000),
					level: 6,
					mapTypeId: window.kakao.maps.MapTypeId.ROADMAP
				};

				map.current = new window.kakao.maps.Map(mapRef.current, options)

				const mapTypeControl = new window.kakao.maps.MapTypeControl();

				map.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.BOTTOMLEFT);

				const zoomControl = new window.kakao.maps.ZoomControl();

				map.current.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);
				const bounds = new window.kakao.maps.LatLngBounds()
				drawMarkers(lagLngArr, bounds)
				map.current.setBounds(bounds)
			})
		}
		return () => script.remove()
	}, [lagLngArr])
	return (
		<div className='relative'>
			<div
				ref={mapRef}
				className='shadow-2xl fixed top-0 left-0 w-full h-screen'
			></div>
		</div>
	)
}

export default LikedBeach