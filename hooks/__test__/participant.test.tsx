import { useRegisterParticipant } from '../participant'
import { render, renderHook } from '@testing-library/react'
import { Participant } from '@/types/planning'
import { setStorage } from '@/utils'
import { addPlanningParticipant } from '@/services/planning'

const USER_MOCK_DATA: Participant = {
	avatar: 'F3',
	id: '1',
	name: 'user1',
	vote: 0,
}
const mockPayload = {
	participants: [USER_MOCK_DATA],
	planningId: '22',
	user: USER_MOCK_DATA,
}

describe('useRegisterParticipant test', () => {
	it('ShouldSetUserInStorage_WhenUseRegisterParticipantIsCalledWithProps', () => {
		renderHook(() => useRegisterParticipant(mockPayload))

		const serviceObject = { addPlanningParticipant }
		const utiliesObject = { setStorage }

		jest.spyOn(utiliesObject, 'setStorage').mockImplementationOnce(() => jest.fn())
		jest.spyOn(serviceObject, 'addPlanningParticipant').mockImplementationOnce(() => Promise.resolve())
	})
})
