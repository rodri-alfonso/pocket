import { Participant } from '@/types/planning'
import { ENVIRONMENTS } from './constants'
import { User } from '@/context/auth'

export function getParticipantsVoteCount(participants: Participant[]) {
	let votesCount: Record<string, number> = {}

	participants.forEach((participant) => {
		votesCount[participant.vote] = ++votesCount[participant.vote] || 1
	})

	return Object.entries(votesCount)
}

export const setStorage = (payload: User) => localStorage.setItem(ENVIRONMENTS.STORAGE_KEY, JSON.stringify(payload))
export const removeStorage = () => localStorage.removeItem(ENVIRONMENTS.STORAGE_KEY)
