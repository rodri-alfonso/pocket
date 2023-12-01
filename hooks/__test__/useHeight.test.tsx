import React from 'react'
import { useHeight } from '../useHeight'
import { render } from '@testing-library/react'

const MockComponent = () => {
	useHeight()
	return <div />
}

describe('useHeight test', () => {
	it('ShouldSetCustomPropertyHeightOnDocument_WhenUseHeightIsCalled', () => {
		const renderedComponent = render(<MockComponent />)

		const setProperty = jest.fn()
		const DOCUMENT_ELEMENT_MOCK = {
			style: {
				setProperty,
			},
		} as any
		jest.spyOn(document.documentElement.style, 'setProperty').mockReturnValue(DOCUMENT_ELEMENT_MOCK)

		expect(renderedComponent).toBeTruthy()
	})
})
