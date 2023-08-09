import { Planning } from '@/types/planning'
import { useEffect, useState } from 'react'
import Register from '@/components/Register'
import { ENVIRONMENTS } from './constants'
import { removeStorage } from './planning-local-storage'
import { useRegistration } from '@/context/planning'

interface Props {
	planning: Planning
}

export default function withRegistration(Component: any) {
	const Auth = (props: Props) => {
		const [isLoading, setIsLoading] = useState(true)
		const { setRegistration, user } = useRegistration()
		console.log('🚀 ~ file: with-registration.tsx:16 ~ user:', user)

		useEffect(() => {
			const storage = JSON.parse(
				localStorage.getItem(ENVIRONMENTS.STORAGE_KEY) || '{"name": "", "id": "", "avatar": "F1", "planningId": ""}'
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
