import { useContext, useReducer, createContext, useEffect } from 'react'
import { State, User } from './types'
import { removeStorage, setStorage, storage } from '@/utils/planning-local-storage'

const SET_REGISTRATION_IN = 'SET_REGISTRATION_IN'
const SET_REGISTRATION_OUT = 'SET_REGISTRATION_OUT'

const initialState: State = {
	user: {
		name: '',
		id: '',
		avatar: 'F1',
		planningId: '',
	},
	isRegistered: false,
}

const PlanningContext = createContext<{ state: State; dispatch: React.Dispatch<any> }>({
	state: initialState,
	dispatch: () => null,
})

const planningReducer = (state: State, action: any): State => {
	switch (action.type) {
		case SET_REGISTRATION_IN:
			return { ...state, user: action.payload }
		case SET_REGISTRATION_OUT:
			return state
		default:
			return state
	}
}

const PlanningProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(planningReducer, initialState)

	return <PlanningContext.Provider value={{ state, dispatch }}>{children}</PlanningContext.Provider>
}

const useRegistration = () => {
	const { state, dispatch } = useContext(PlanningContext)

	useEffect(() => {
		// if (storage) dispatch({ type: SET_REGISTRATION_IN, payload: storage })
	}, [])

	const setRegistration = (payload: User) => {
		dispatch({ type: SET_REGISTRATION_IN, payload })
		setStorage(payload)
	}

	const deleteRegistration = () => {
		dispatch({ type: SET_REGISTRATION_OUT })
		removeStorage()
	}

	return { user: state.user, setRegistration, deleteRegistration }
}

export { PlanningProvider, useRegistration }
