import { useEffect, useState } from 'react'
import { Planning } from '@/types/planning'
import { PLANNING_REF_BY_ID } from '@/firebase-config'
import { onSnapshot } from 'firebase/firestore'

interface PlanningState {
	initialPlanning: Planning
	planningId: string
}

export function usePlanningState({ initialPlanning, planningId }: PlanningState) {
	const [planning, setPlanning] = useState(initialPlanning)

	useEffect(() => {
		const unsubscribe = onSnapshot(PLANNING_REF_BY_ID(planningId), (doc) => {
			if (doc.exists() && doc.data()?.hostId) {
				setPlanning(doc.data() as Planning)
			}
		})

		return () => unsubscribe()
	}, [])

	return { planning }
}
