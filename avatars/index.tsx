import { lazy, Suspense } from 'react'

interface Props {
	type: 'M1' | 'M2' | 'F1'
}

export default function Avatar({ type }: Props) {
	const IconComponent = lazy(() => import(`./${type}`))

	return (
		<Suspense>
			<IconComponent />
		</Suspense>
	)
}
