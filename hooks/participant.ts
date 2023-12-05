import { User } from '@/context/auth'
import { addPlanningParticipant } from '@/services/planning'
import { Participant } from '@/types/planning'
import { setStorage } from '@/utils'
import { useEffect, useState } from 'react'

interface useRegisterParticipantProps {
	participants: Participant[]
	planningId: string
	user: User
}

export function useRegisterParticipant({ participants, planningId, user }: useRegisterParticipantProps) {
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const isUserInParticipants = participants.some((participant: Participant) => participant.id === user.id)

		if (!!user.name && !isUserInParticipants) {
			setIsLoading(true)
			addPlanningParticipant(planningId, { ...user, vote: 0 }).then(() => {
				setStorage(user)
				setIsLoading(false)
			})
		}
	}, [])

	return { isLoading }
}
