import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getLikedBeach } from '@utils/axiosFunctions/ownApi'

function LikedBeach() {
	const router = useRouter()

	const { data, isLoading, error } = useQuery<any>(['likedBeach', router.query.id], () => getLikedBeach(router.query.id), { enabled: !!router.query.id })
	console.log(data?.user)
	return (
		<div>LikedBeach</div>
	)
}

export default LikedBeach