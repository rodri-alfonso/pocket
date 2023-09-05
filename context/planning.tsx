import { useContext, useReducer, createContext } from 'react'
import { State, User } from './types'
import {
	removeStorage,
	setStorage,
	setPlanningStorage,
	concurrentPlanningStorage,
} from '@/utils/planning-local-storage'

const SET_REGISTRATION_IN = 'SET_REGISTRATION_IN'
const SET_REGISTRATION_OUT = 'SET_REGISTRATION_OUT'
const SET_CONCURRENT_PLANNINGS = 'SET_CONCURRENT_PLANNINGS'

const initialState: State = {
	user: {
		name: '',
		id: '',
		avatar: 'F1',
	},
	isRegistered: false,
	concurrentPlannings: [],
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

	const setRegistration = (payload: User) => {
		dispatch({ type: SET_REGISTRATION_IN, payload })
		setStorage(payload)
	}

	const deleteRegistration = () => {
		dispatch({ type: SET_REGISTRATION_OUT })
		removeStorage()
	}

	const setCurrentPlanning = (payload: string) => {
		dispatch({ type: SET_CONCURRENT_PLANNINGS, payload })
		setPlanningStorage([...concurrentPlanningStorage(), payload])
	}

	return {
		user: state.user,
		setRegistration,
		deleteRegistration,
		concurrentPlannings: state.concurrentPlannings,
		setCurrentPlanning,
	}
}

export { PlanningProvider, useRegistration }
