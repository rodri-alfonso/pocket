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
import Spinner from './Spinner'

interface Props {
	planning: Planning
}

export default function EmptyStateGuests({ planning }: Props) {
	const router = useRouter()
	const planningId = router.query.id as string

	const { user } = useAuth()
	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const { isLoading } = useRegisterParticipant({ participants: planning.participants, planningId, user })

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
				{isLoading ? (
					<div className='h-full flex flex-col items-center gap-6 '>
						<h2 className='font-medium mb-4 text-gray-700 py-0.5 bg-gray-100 rounded-full px-5 mx-auto text-center'>
							Arriving to the planning...
						</h2>
						<svg
							className='w-10 h-10 text-gray-200 animate-spin dark:text-gray-300 fill-gray-700'
							viewBox='0 0 100 101'
							fill='none'
						>
							<path
								d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
								fill='currentColor'
							/>
							<path
								d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
								fill='currentFill'
							/>
						</svg>
					</div>
				) : (
					<>
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
					</>
				)}
			</Content>
		</Page>
	)
}
