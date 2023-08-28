import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRegistration } from '@/context/planning'
import Content from '@/layouts/Content'
import Button from '@/theme/button'
import { Participant } from '@/types/planning'
import planningService from '@/services/planning'

export default function EmptyStateGuests() {
	const router = useRouter()
	const planningLink = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`
	const { user } = useRegistration()
	const planningId = router.query.id as string

	const { addParticipant, getDocument } = planningService

	useEffect(() => {
		getDocument(planningId).then((document) => {
			if (!document.exists()) return

			const isUserInParticipants = document
				.data()
				.participants.some((participant: Participant) => participant.id === user.id)

			if (user.name && !isUserInParticipants) {
				addParticipant(planningId, { name: user.name, vote: 0, id: user.id, avatar: 'F1' })
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
