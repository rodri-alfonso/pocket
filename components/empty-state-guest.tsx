import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRegistration } from '@/context/planning'
import { arrayUnion, setDoc, getDoc } from 'firebase/firestore'
import Content from '@/layouts/Content'
import { PLANNING_REF_WITH_ID } from '@/firebase-config'
import Button from '@/theme/button'
import { Participant } from '@/types/planning'

interface Props {
	planningName: string
}

export default function EmptyStateGuests({ planningName }: Props) {
	const router = useRouter()
	const planningLink = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`
	const { user } = useRegistration()
	const docRef = PLANNING_REF_WITH_ID(router.query.id as string)

	useEffect(() => {
		//mejorar la sintaxis de esto y hacerlo mas legible
		getDoc(docRef).then((res) => {
			if (!res.exists()) return

			const isUserInParticipants = res
				.data()
				.participants.some((participant: Participant) => participant.id === user.id)

			if (user.name && !isUserInParticipants) {
				setDoc(
					docRef,
					{ participants: arrayUnion({ name: user.name, vote: 0, id: user.id, avatar: 'F1' }) },
					{ merge: true }
				)
			}
		})
	}, [])

	function handleCopyLink() {
		navigator.clipboard.writeText(planningLink).then(() => {
			alert('copied')
		})
	}

	// if (isLoading) return <div>Loading...</div>

	return (
		<Page>
			<Content>
				<h2 className='font-medium text-center'>Invite guests to your planning</h2>

				<div className='grid gap-4 pt-6'>
					<Input value={planningLink} label='Invitation link' placeholder='' onChange={(e) => {}} />
					<Button text='Copy on clipboard' onClick={handleCopyLink} />
				</div>
			</Content>
		</Page>
	)
}
