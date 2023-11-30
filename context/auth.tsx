import { useContext, useReducer, createContext, useState, useEffect } from 'react'
import { removeStorage, setStorage } from '@/utils'
import { INITIAL_USER_DATA } from '@/utils/config'
import { ENVIRONMENTS } from '@/utils/constants'
import { AvatarType } from '@/assets/avatars'

export type User = {
	name: string
	id: string
	avatar: AvatarType
}

const SET_LOGIN = 'SET_LOGIN'
const SET_LOGOUT = 'SET_LOGOUT'

const initialState: User = INITIAL_USER_DATA

const AuthContext = createContext<{ user: User; dispatch: React.Dispatch<any> }>({
	user: initialState,
	dispatch: () => null,
})

const authReducer = (state: User, action: any): User => {
	switch (action.type) {
		case SET_LOGIN:
			return { ...state, ...action.payload }
		case SET_LOGOUT:
			return initialState
		default:
			return initialState
	}
}

const AuthProvider = ({ children }: any) => {
	const [user, dispatch] = useReducer(authReducer, initialState)

	return <AuthContext.Provider value={{ user, dispatch }}>{children}</AuthContext.Provider>
}

const useAuth = () => {
	const { user, dispatch } = useContext(AuthContext)

	const login = (payload: User) => {
		dispatch({ type: SET_LOGIN, payload })
		setStorage(payload)
	}

	const logout = () => {
		dispatch({ type: SET_LOGOUT })
		removeStorage()
	}

	return {
		user,
		login,
		logout,
	}
}

const usePersistAuth = () => {
	const { user, dispatch } = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const userStorage = JSON.parse(localStorage.getItem(ENVIRONMENTS.STORAGE_KEY) || JSON.stringify(INITIAL_USER_DATA))

		if (userStorage.name) {
			dispatch({ type: SET_LOGIN, payload: userStorage })
			setStorage(userStorage)
		}
		setIsLoading(false)
	}, [])

	return {
		user,
		isLoading,
	}
}

export { AuthProvider, useAuth, usePersistAuth }
