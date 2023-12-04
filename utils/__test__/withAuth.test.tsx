import { render, screen } from '@testing-library/react'
import ComponentMock from './ComponentMock'
import { Planning } from '@/types/planning'

const PLANNING_MOCK: Planning = {
	name: '',
	average: 0,
	host: '',
	hostId: '',
	participants: [],
	votingSystem: 'fibonacci',
}

describe('withAuth test', () => {
	const useRouter = jest.spyOn(require('next/router'), 'useRouter')

	useRouter.mockImplementation(() => ({
		query: '',
	}))
	it('ShouldRenderLandingComponentWithoutRegister_WhenHasNoUserLogedIn', () => {
		const renderedComponent = render(<ComponentMock planning={PLANNING_MOCK} />)

		expect(renderedComponent.getByText('Fast, easy, on-the-go poker planning')).toBeInTheDocument()
		expect(screen.queryByText('Choose a Nickname')).toBeNull()
	})
})
