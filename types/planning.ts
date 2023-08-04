type VotingSystem = 'fibonacci' | 'tshirt' | 'custom'

export type Participant = {
	name: string
	vote: number
}

export interface Planning {
	participants: Array<Participant>
	host: string
	name: string
	hostId: string
	votingSystem: VotingSystem
	average: number
}
