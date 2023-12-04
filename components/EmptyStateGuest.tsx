import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '@/context/auth'
import Content from '@/layouts/Content'
import Button from '@/theme/button'
import Alert from '@/theme/alert'
import Avatar from '@/assets/avatars'
import { Planning } from '@/types/planning'
import { useRegisterParticipant } from '@/hooks/participant'

interface Props {
	planning: Planning
}

export default function EmptyStateGuests({ planning }: Props) {
	const router = useRouter()
	const planningId = router.query.id as string

	const { user } = useAuth()
	const [isAlertOpen, setIsAlertOpen] = useState(false)
	useRegisterParticipant({ participants: planning.participants, planningId, user })

	const planningLink = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`

	function handleCopyLink() {
		navigator.clipboard.writeText(planningLink).then(() => {
			setIsAlertOpen(true)
		})
	}

	return (
		<Page className='p-10 relative'>
			<Content isHost={planning.hostId === user.id}>
				<picture className='grid gap-2 place-items-center pb-4'>
					<Avatar type={user.avatar} />
					<h3 className='font-semibold h-5 capitalize text-sm'>{user.name}</h3>
				</picture>
				<h2 className='font-medium mb-4 text-gray-700 py-0.5 bg-gray-100 rounded-full px-5 mx-auto text-center'>
					Invite guests to your new planning
				</h2>
				<div className=' bg-gray-50 rounded-lg pt-4'>
					<div className='grid gap-2 px-6'>
						<Input value={planningLink} label='Invitation link' placeholder='' onChange={(e) => {}} />
						<Button text='Copy on clipboard' onClick={handleCopyLink} />
					</div>
					<Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} label='Copied to clipboard!' />
				</div>
			</Content>
		</Page>
	)
}
