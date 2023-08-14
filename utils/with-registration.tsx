import { Planning } from '@/types/planning'
import { useEffect, useState } from 'react'
import Register from '@/components/Register'
import { ENVIRONMENTS } from './constants'
import { removeStorage } from './planning-local-storage'
import { useRegistration } from '@/context/planning'
import { useRouter } from 'next/router'

interface Props {
	planning: Planning
}

export default function withRegistration(Component: any) {
	const Auth = (props: Props) => {
		const [isLoading, setIsLoading] = useState(true)
		const { setRegistration, user } = useRegistration()
		const router = useRouter()

		useEffect(() => {
			const storage = JSON.parse(
				localStorage.getItem(ENVIRONMENTS.STORAGE_KEY) || '{"name": "", "id": "", "avatar": "F1"}'
			)
			if (storage) setRegistration(storage)

			setIsLoading(false)
		}, [])

		if (isLoading) return <span>Loading...</span>
		if (!user.name) return <Register planning={props.planning} />
		return <Component {...props} />
	}

	return Auth
}
