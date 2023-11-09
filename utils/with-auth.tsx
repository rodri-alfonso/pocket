import { Planning } from '@/types/planning'
import { useEffect, useState } from 'react'

import { ENVIRONMENTS } from './constants'
import { useRegistration } from '@/context/planning'
import Register from '../components/Register'

interface AuthProps {
	planning: Planning
}

export default function withAuth(Component: any) {
	const Auth = (props: AuthProps) => {
		const [isLoading, setIsLoading] = useState(true)
		const { setRegistration, user } = useRegistration()

		useEffect(() => {
			const storage = JSON.parse(
				localStorage.getItem(ENVIRONMENTS.STORAGE_KEY) ||
					'{"name": "", "id": "", "avatar": "F2", "concurrentPlannings": "[]"}'
			)

			if (storage.name) setRegistration(storage)

			setIsLoading(false)
		}, [])

		if (isLoading) return <span>Loading...</span>
		if (!user.name) return <Register />
		return <Component {...props} />
	}

	return Auth
}
