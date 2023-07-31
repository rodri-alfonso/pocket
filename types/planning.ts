type VotingSystem = 'fibonacci' | 'tshirt' | 'custom'

export type Participant = {
	name: string
	vote: number
}

export interface Planning {
	participants: Array<Participant>
	host: string
	name: string
	isEstimateOpen: boolean
	currentEstimate: number
	hostId: string
	votingSystem: VotingSystem
}
