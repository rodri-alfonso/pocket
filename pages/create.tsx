import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useState } from 'react'
import Router from 'next/router'
import Link from '@/theme/button-link'
import { db } from '@/firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { Planning } from '@/types/planning'
import { useId } from 'react'
import { useRegistration } from '@/context/planning'

export default function Create() {
	const [planningName, setPlanningName] = useState('')
	const [username, setUsername] = useState('')
	const hostId = useId()
	const { setRegistration } = useRegistration()

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!planningName || !username) return console.log('Please fill out all fields')

		const payload: Planning = {
			currentEstimate: 0,
			hostId,
			participants: [{ name: username, vote: 0 }],
			host: username,
			isEstimateOpen: false,
			name: planningName,
			votingSystem: 'fibonacci',
		}

		addDoc(collection(db, 'plannings'), payload)
			.then((response) => {
				setRegistration({ name: username, id: hostId })
				Router.push(`/planning/${response.id}`)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<Page>
			<Link href='/' label='◀️' className='mb-4' />

			<form onSubmit={handleSubmit} className='flex flex-col justify-between h-full p-4'>
				<picture className='rounded-md py-20 bg-gray-200'></picture>

				<div className='grid gap-4'>
					<Input
						label='Planning Name'
						placeholder='Enter a planning name'
						value={planningName}
						onChange={(e) => setPlanningName(e.target.value)}
					/>
					<Input
						label='Your Name'
						placeholder='Enter your name'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<button
					className={`bg-gray-800 text-white font-medium px-2 py-3 w-full max-w-xs mx-auto rounded-md text-center active:scale-95 transition-all`}
				>
					Create
				</button>
			</form>
		</Page>
	)
}
