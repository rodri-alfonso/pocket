import { getParticipantsVoteCount, removeStorage, setStorage } from '..'
import { Participant } from '@/types/planning'
import { User } from '@/context/auth'
import { ENVIRONMENTS } from '../constants'

describe('getParticipantsVoteCount test', () => {
	const USERS_MOCK: Participant[] = [
		{
			name: 'user1',
			vote: 1,
			avatar: 'F2',
			id: '1',
		},
		{
			name: 'user2',
			vote: 1,
			avatar: 'F2',
			id: '2',
		},
		{
			name: 'user3',
			vote: 1,
			avatar: 'F2',
			id: '3',
		},
	]
	it('ShouldReturnParticipantsCountEntries_WhenGiveAnArrayOfParticipants', () => {
		const EXPECTED_ENTRIES = [['1', 3]]

		const result = getParticipantsVoteCount(USERS_MOCK)
		expect(result).toStrictEqual(EXPECTED_ENTRIES)
	})

	it('ShouldReturnEmptyArray_WhenGiveAnEmptyArray', () => {
		const result = getParticipantsVoteCount([])
		expect(result).toStrictEqual([])
	})

	it('ShouldReturnParticipantsCountEntriesWithCero_WhenGiveAnArrayOfParticipantsWithVoteCero', () => {
		const USERS_MOCK_WITHOUT_VOTE: Participant[] = [
			{
				name: 'user1',
				vote: 0,
				avatar: 'F2',
				id: '1',
			},
			{
				name: 'user2',
				vote: 0,
				avatar: 'F2',
				id: '2',
			},
			{
				name: 'user3',
				vote: 0,
				avatar: 'F2',
				id: '3',
			},
		]

		const EXPECTED_ENTRIES_WITHOUT_VOTES = [['0', 3]]

		const result = getParticipantsVoteCount(USERS_MOCK_WITHOUT_VOTE)
		expect(result).toStrictEqual(EXPECTED_ENTRIES_WITHOUT_VOTES)
	})
})

describe('setStorage and removeStorage test', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: jest.fn(() => null),
				setItem: jest.fn(() => null),
				removeItem: jest.fn(() => null),
			},
			writable: true,
		})
	})

	it('ShouldSetLocalStorageData_WhenCallSetStorageAndGiveValue', () => {
		const VALUE_STORAGE_MOCK: User = { avatar: 'F4', name: 'user1', id: '1' }
		setStorage(VALUE_STORAGE_MOCK)

		expect(localStorage.setItem).toHaveBeenCalledWith(ENVIRONMENTS.STORAGE_KEY, JSON.stringify(VALUE_STORAGE_MOCK))
	})

	it('ShouldRemoveLocalStorageData_WhenCallRemoveStorage', () => {
		const VALUE_STORAGE_MOCK: User = { avatar: 'F4', name: 'user1', id: '1' }
		setStorage(VALUE_STORAGE_MOCK)
		removeStorage()

		expect(localStorage.removeItem).toHaveBeenCalledWith(ENVIRONMENTS.STORAGE_KEY)
	})
})
