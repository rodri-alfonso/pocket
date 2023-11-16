import { Planning } from '@/types/planning'
import { useEffect, useState } from 'react'

import { ENVIRONMENTS } from './constants'
import { useRegistration } from '@/context/planning'
import Spinner from '@/components/Spinner'
import Landing from '@/components/Landing'

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
					'{"name": "", "id": "", "avatar": "M4", "concurrentPlannings": "[]"}'
			)

			if (storage.name) setRegistration(storage)

			setIsLoading(false)
		}, [])

		if (isLoading) return <Spinner />
		if (!user.name) return <Landing />
		return <Component {...props} />
	}

	return Auth
}
