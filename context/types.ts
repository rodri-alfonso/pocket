export type User = {
	name: string
	id: string
}

export interface State {
	user: User
	isRegistered: boolean
}
