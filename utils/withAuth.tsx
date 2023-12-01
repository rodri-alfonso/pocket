import { Planning } from '@/types/planning'
import Spinner from '@/components/Spinner'
import Landing from '@/components/Landing'
import { usePersistAuth } from '@/context/auth'

interface AuthProps {
	planning: Planning
}

export default function withAuth(Component: any) {
	const Auth = (props: AuthProps) => {
		const { isLoading, user } = usePersistAuth()

		if (isLoading) return <Spinner isFullPage />
		if (!user.name) return <Landing />
		return <Component {...props} />
	}

	return Auth
}
