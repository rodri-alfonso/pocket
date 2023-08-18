import { Participant } from '@/types/planning'

export function getParticipantsVoteCount(participants: Participant[]) {
	let votesCount: Record<string, number> = {}

	participants.forEach((participant) => {
		votesCount[participant.vote] = ++votesCount[participant.vote] || 1
	})

	return Object.entries(votesCount)
}
