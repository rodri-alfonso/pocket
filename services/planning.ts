import { db } from '@/firebase-config'
import { Participant, Planning } from '@/types/planning'
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const docRef = (docId: string) => doc(db, 'plannings', docId)

const planningService = {
	createDocument: async (payload: Planning) =>
		addDoc(collection(db, 'plannings'), payload).catch((error) => {
			console.log(error)
		}),

	addParticipant: async (planningId: string, user: Participant) =>
		setDoc(docRef(planningId), { participants: arrayUnion(user) }, { merge: true }),

	getDocument: async (planningId: string) => getDoc(docRef(planningId)),
	setAverage: async (planningId: string, average: number) => updateDoc(docRef(planningId), { average }),
	resetPlanning: async (planningId: string, newParticipants: Participant[]) =>
		updateDoc(docRef(planningId), { average: 0, participants: newParticipants }),
	deleteParticipant: async (planningId: string, userId: string, participants: Participant[]) => {
		const newParticipants = participants.filter((participant: Participant) => participant.id !== userId)
		await planningService.resetPlanning(planningId, newParticipants)
	},
}

export default planningService
