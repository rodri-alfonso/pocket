import { AvatarType } from '@/assets/avatars'
type VotingSystem = 'fibonacci' | 'tshirt' | 'custom'

export type Participant = {
	vote: number
	name: string
	avatar: AvatarType
	id: string
}

export interface Planning {
	participants: Array<Participant>
	host: string
	name: string
	hostId: string
	votingSystem: VotingSystem
	average: number
}
