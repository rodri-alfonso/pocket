import { getDocs } from 'firebase/firestore'
import { PLANNINGS_REF } from '@/firebase-config'

export async function getAllPlannings() {
	const querySnapshot = await getDocs(PLANNINGS_REF)
	const plannings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
	return plannings
}
