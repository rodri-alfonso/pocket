import { Participant, VotingSystem } from '@/types/planning'
import { User } from '@/context/auth'

export const VOTING_SYSTEM_MAP: Record<VotingSystem, Array<number | string>> = {
	fibonacci: [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, '?', '☕️'],
	tshirt: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?', '☕️'],
	custom: [],
}

export const INITIAL_USER_DATA: User = { name: '', id: '', avatar: 'M4' }
export const INITIAL_PARTICIPANT_DATA: Participant = {
	id: '',
	name: '',
	vote: 0,
	avatar: 'M4',
}
