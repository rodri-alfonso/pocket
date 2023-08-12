type VotingSystem = 'fibonacci' | 'tshirt' | 'custom'
export type Avatar = 'F1' | 'F2'

export type Participant = {
	vote: number
	name: string
	avatar: Avatar
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
