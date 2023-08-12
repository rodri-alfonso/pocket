import { useEffect, useState } from 'react'
import { Planning } from '@/types/planning'
import { PLANNING_REF_WITH_ID } from '@/firebase-config'
import { onSnapshot } from 'firebase/firestore'

interface PlanningState {
	initialPlanning: Planning
	planningId: string
}

export function usePlanningState({ initialPlanning, planningId }: PlanningState) {
	//memorizar este valor
	const [planning, setPlanning] = useState(initialPlanning)

	useEffect(() => {
		const unsubscribe = onSnapshot(PLANNING_REF_WITH_ID(planningId), (doc) => {
			if (doc.exists()) setPlanning(doc.data() as Planning)
		})

		return () => unsubscribe()
	}, [])

	// return { participants: planning.participants, planning }
	return { participants: planning.participants, planning }
}

// hacer un context y memorizarlo para guardar la informacion del auth y de la planning ;)
