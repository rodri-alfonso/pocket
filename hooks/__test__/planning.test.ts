import { renderHook } from '@testing-library/react'
import { Planning } from '@/types/planning'
import { usePlanningState } from '../planning'

const INITIAL_PLANNING_MOCK_DATA: Planning = {
	average: 0,
	host: '1',
	participants: [],
	hostId: '1',
	name: 'planning1',
	votingSystem: 'fibonacci',
}

const mockPayload = {
	initialPlanning: INITIAL_PLANNING_MOCK_DATA,
	planningId: '22',
}

describe('usePlanningState test', () => {
	test('ShouldReturnUpdatePlanning_WhenUseUsePlanningStateIsUpdated', () => {
		const { result, rerender } = renderHook(() => usePlanningState(mockPayload))
		expect(result.current.planning).toEqual(INITIAL_PLANNING_MOCK_DATA)
	})
})
