import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRegistration } from '@/context/planning'
import Content from '@/layouts/Content'
import Button from '@/theme/button'
import { Participant } from '@/types/planning'
import planningService from '@/services/planning'
import Alert from '@/theme/alert'
import { setStorage, storage } from '@/utils/planning-local-storage'
import F1 from '@/avatars/F1'

export default function EmptyStateGuests() {
	const router = useRouter()
	const [isAlertOpen, setIsAlertOpen] = useState(false)
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

				setStorage({ ...user, concurrentPlannings: [planningId] })
			}
		})
	}, [])

	function handleCopyLink() {
		navigator.clipboard.writeText(planningLink).then(() => {
			setIsAlertOpen(true)
		})
	}

	return (
		<Page className='p-10'>
			<Content>
				<picture className='grid gap-2 place-items-center pb-4'>
					<F1 />
					<h3 className='font-semibold h-5 capitalize text-sm'>{user.name}</h3>
				</picture>
				<h2 className='font-medium mb-4 text-gray-700 py-0.5 bg-gray-100 rounded-full px-5 mx-auto text-center'>
					Invite guests to your new planning
				</h2>
				<div className='relative bg-gray-50 rounded-lg py-4'>
					<div className='grid gap-2 px-6'>
						<Input value={planningLink} label='Invitation link' placeholder='' onChange={(e) => {}} />
						<Button text='Copy on clipboard' onClick={handleCopyLink} />
					</div>
					{isAlertOpen && (
						<Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} label='Copied to clipboard!' />
					)}
				</div>
			</Content>
		</Page>
	)
}
