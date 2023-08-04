import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useState } from 'react'
import Router from 'next/router'
import { db } from '@/firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { Planning } from '@/types/planning'
import { useId } from 'react'
import { useRegistration } from '@/context/planning'
import ButtonDouble from '@/theme/button-double'

export default function Create() {
	const [planningName, setPlanningName] = useState('')
	const [username, setUsername] = useState('')
	const hostId = useId()
	const { setRegistration, user } = useRegistration()

	const hasUser = Boolean(user.name) || Boolean(username)

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!planningName || !username) return console.log('Please fill out all fields')

		const payload: Planning = {
			hostId,
			participants: [{ name: username, vote: 0 }],
			host: username,
			average: 0,
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
			<form onSubmit={handleSubmit} className='flex flex-col justify-between h-full'>
				<h1 className='font-semibold text-lg '>Planning Creator</h1>
				<div className='grid gap-8'>
					<Input
						label='Planning Name'
						placeholder='Enter a planning name'
						value={planningName}
						onChange={(e) => setPlanningName(e.target.value)}
					/>
					{!user.name && (
						<Input
							label='Enter your name'
							placeholder='Enter username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					)}
				</div>
				<ButtonDouble
					labelPrimary='Create'
					labelSecondary='Cancel'
					disabled={!planningName || !hasUser}
					onClickPrimary={() => {}}
					onClickSecondary={() => Router.push('/')}
				/>
			</form>
		</Page>
	)
}
