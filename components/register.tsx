import { useState, useId } from 'react'
import Input from '@/theme/Input'
import Page from '@/layouts/Page'
import { Planning } from '@/types/planning'
import { useRouter } from 'next/router'
import { doc, setDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { useRegistration } from '@/context/planning'
import Button from '@/theme/button'
import F1 from '@/avatars/F1'

interface Props {
	planning: Planning
}

export default function Register({ planning }: Props) {
	const [username, setUsername] = useState('')
	const userId = useId()
	const router = useRouter()
	const { setRegistration } = useRegistration()

	const planningId = router.query.id as string

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		// const docRef = doc(db, 'plannings', planningId)
		// setDoc(docRef, { participants: arrayUnion({ name: username, vote: 0, avatar: 'F1' }) }, { merge: true }).then(
		// 	() => {
		// 		setRegistration({ name: username, id: userId, avatar: 'F1' })
		// 	}
		// 	)
		setRegistration({ name: username, id: userId, avatar: 'F1', planningId: '' })
	}

	return (
		<Page className=''>
			<div className='h-full flex flex-col gap-4'>
				<picture className='grid gap-2 place-items-center'>
					<F1 />
					<h3 className='font-semibold h-5 capitalize text-sm'>{username}</h3>
				</picture>
				<div className='rounded-3xl bg-gray-50 h-5/6 overflow-hidden'>
					<form onSubmit={handleSubmit} className='flex flex-col justify-between items-center h-full p-6'>
						<div className='w-full grid gap-10 text-center'>
							<div className=' w-full rounded-3xl grid gap-6'>
								<h2 className='font-semibold text-lg text-black'>Welcome{username && `, ${username}`}</h2>
								<Input
									label='Choose a Nickname'
									placeholder='Type you nickname...'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
						</div>
						<Button text='Continue' disabled={!username} onClick={() => {}} className='w-full max-w-xs mx-auto' />
					</form>
				</div>
			</div>
		</Page>
	)
}
