import { useState, useId } from 'react'
import Input from '@/theme/Input'
import Page from '@/layouts/Page'
import { Planning } from '@/types/planning'
import { useRouter } from 'next/router'
import { doc, setDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { useRegistration } from '@/context/planning'

interface Props {
	planning: Planning
}

export default function Register({ planning }: Props) {
	const [username, setUsername] = useState('')
	const userId = useId()
	const router = useRouter()
	const { setRegistration } = useRegistration()

	const planningId = router.query.id as string

	function handleClick() {
		const docRef = doc(db, 'plannings', planningId)
		setDoc(docRef, { participants: arrayUnion({ name: username, vote: 0 }) }, { merge: true }).then(() => {
			setRegistration({ name: username, id: userId })
		})
	}

	return (
		<Page className='absolute top-0 left-0 z-50'>
			<span>im the register page</span>
			<Input
				label='Your Name'
				placeholder='Enter your name'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<button onClick={handleClick}>Enter to the room</button>
		</Page>
	)
}
