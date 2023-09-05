import { Avatar } from '@/types/planning'

export type User = {
	name: string
	id: string
	avatar: Avatar
}

export interface State {
	user: User
	isRegistered: boolean
	concurrentPlannings: string[]
}
