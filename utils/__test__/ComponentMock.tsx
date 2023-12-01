import withAuth from '../withAuth'

function ComponentMock() {
	return (
		<div>
			<h1>Mock Component</h1>
		</div>
	)
}

export default withAuth(ComponentMock)
