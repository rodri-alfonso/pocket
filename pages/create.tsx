import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useState } from 'react'
import Router from 'next/router'
import Link from '@/theme/button-link'
import { db } from '@/firebase-config'
import { collection, addDoc } from 'firebase/firestore'

export default function Creator() {
	const [roomName, setRoomName] = useState('')
	const [username, setUsername] = useState('')

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!roomName || !username) return console.log('Please fill out all fields')

		addDoc(collection(db, 'rooms'), {
			roomName,
			username,
		})
			.then((response) => {
				console.log('🚀 ~ file: create.tsx:24 ~ response:', response)
				// Router.push(`/room/${response.id}`)
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
						label='Room Name'
						placeholder='Enter a room name'
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
					/>
					<Input
						label='Your Name'
						placeholder='Enter your name'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<button>Create</button>
			</form>
		</Page>
	)
}
