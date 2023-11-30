import { User } from '@/context/auth'
import { addPlanningParticipant } from '@/services/planning'
import { Participant } from '@/types/planning'
import { setStorage } from '@/utils'
import { useEffect } from 'react'

interface useRegisterParticipantProps {
	participants: Participant[]
	planningId: string
	user: User
}

export function useRegisterParticipant({ participants, planningId, user }: useRegisterParticipantProps) {
	useEffect(() => {
		const isUserInParticipants = participants.some((participant: Participant) => participant.id === user.id)

		if (!!user.name && !isUserInParticipants) {
			addPlanningParticipant(planningId, { ...user, vote: 0 })
			setStorage(user)
		}
	}, [])
}
