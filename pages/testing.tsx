import Page from '@/layouts/Page'
import { useState } from 'react'
import Content from '@/layouts/Content'

export default function TestingPage() {
	const [isOpen, setIsOpen] = useState(false)

	if (isOpen)
		return (
			<Content className='h-screen p-4'>
				<div className='h-full bg-pink-200 rounded-lg'>
					<h1>I'm the content schema</h1>
				</div>
			</Content>
		)

	return (
		<Page className=''>
			<div className='h-full bg-blue-200 rounded-lg'>
				<h1>I'm the TestPage</h1>
				<button onClick={() => setIsOpen(true)} className='bg-orange-400 p-3'>
					Clickme
				</button>
			</div>
		</Page>
	)
}
