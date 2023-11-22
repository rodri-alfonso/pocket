import { getParticipantsVoteCount } from '..'
import { Participant } from '@/types/planning'

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
describe('getParticipantsVoteCount test', () => {
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
