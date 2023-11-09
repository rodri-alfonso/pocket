import { AvatarType } from '@/assets/avatars'

export type User = {
	name: string
	id: string
	avatar: AvatarType
}

export interface State {
	user: User
	isRegistered: boolean
	concurrentPlannings: string[]
}
