import { Participant, Planning } from '@/types/planning'
import { addDoc, arrayUnion, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { PLANNING_REF_BY_ID, PLANNINGS_REF } from '@/firebase-config'

export const createPlanning = async (payload: Planning) => await addDoc(PLANNINGS_REF, payload)

export const getPlanning = async (planningId: string): Promise<Planning | null> => {
	const document = await getDoc(PLANNING_REF_BY_ID(planningId))
	let planning = null

	if (document.exists()) planning = document.data() as Planning
	return planning
}

export const deletePlanning = async (planningId: string) => await deleteDoc(PLANNING_REF_BY_ID(planningId))

export const setPlanningAverage = async (planningId: string, average: number) =>
	await updateDoc(PLANNING_REF_BY_ID(planningId), { average })

export const resetPlanning = async (planningId: string, newParticipants: Participant[]) =>
	await updateDoc(PLANNING_REF_BY_ID(planningId), { average: 0, participants: newParticipants })

export const deletePlanningParticipant = async (planningId: string, userId: string, participants: Participant[]) => {
	const newParticipants = participants.filter((participant: Participant) => participant.id !== userId)
	await resetPlanning(planningId, newParticipants)
}

export const addPlanningParticipant = async (planningId: string, user: Participant) =>
	await setDoc(PLANNING_REF_BY_ID(planningId), { participants: arrayUnion(user) }, { merge: true })
