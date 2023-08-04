import { useEffect, useState } from 'react'
import { Participant, Planning } from '@/types/planning'
import { db } from '@/firebase-config'

import { doc, onSnapshot } from 'firebase/firestore'

interface PlanningState {
	initialPlanning: Planning
	planningId: string
}

export function usePlanningState({ initialPlanning, planningId }: PlanningState) {
	//memorizar este valor
	const [planning, setPlanning] = useState(initialPlanning)

	useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, 'plannings', planningId), (doc) => {
			if (doc.exists()) setPlanning(doc.data())
		})

		return () => unsubscribe()
	}, [])

	// return { participants: planning.participants, planning }
	return { participants: planning.participants, planning }
}

// hacer un context y memorizarlo para guardar la informacion del auth y de la planning ;)
