import { useEffect, useState } from 'react'
import { Participant } from '@/types/planning'
import { db } from '@/firebase-config'

import { doc, onSnapshot } from 'firebase/firestore'

interface PlanningState {
	initialParticipants: Array<Participant>
	planningId: string
}

export function usePlanningState({ initialParticipants, planningId }: PlanningState) {
	//memorizar este valor
	const [participants, setParticipants] = useState(initialParticipants)

	useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, 'plannings', planningId), (doc) => {
			if (doc.exists()) setParticipants([...doc.data().participants])
		})

		return () => unsubscribe()
	}, [])

	return { participants }
}

// hacer un context y memorizarlo para guardar la informacion del auth y de la planning ;)
