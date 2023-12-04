import { Participant } from '@/types/planning'
import { useAuth } from '@/context/auth'
import CheckIcon from '@/assets/icons/Check'
import { useState } from 'react'
import { deletePlanningParticipant } from '@/services/planning'
import { useRouter } from 'next/router'
import OptionsModal from '../OptionsModal'
import Avatar from '@/assets/avatars'
import { INITIAL_PARTICIPANT_DATA } from '@/utils/config'

interface Props {
	participants: Participant[]
	average: number
	hostId?: string
}

export default function Participants({ participants, average, hostId }: Props) {
	const router = useRouter()
	const { user } = useAuth()
	const [selectedParticipant, setSelectedParticipant] = useState<Participant>(INITIAL_PARTICIPANT_DATA)

	const isHost = user.id === hostId

	function handleDelete() {
		if (!selectedParticipant) return
		setSelectedParticipant(INITIAL_PARTICIPANT_DATA)
		deletePlanningParticipant(router.query.id as string, selectedParticipant.id, participants)
	}

	return (
		<section className='h-28 px-6 items-center rounded-3xl flex gap-3 w-full overflow-x-scroll bg-gray-100'>
			{participants.map((participant) => (
				<button
					disabled={!isHost}
					onClick={() => participant.id !== user.id && setSelectedParticipant(participant)}
					key={participant.name}
					className={`grid place-items-center gap-2 text-center active:scale-95 transition-all disabled:active:scale-[0px]   p-1 rounded-xl disabled:bg-inherit ${
						Boolean(participant.vote) ? '' : 'opacity-30 '
					} ${
						isHost && participant.id !== hostId
							? 'hover:opacity-100 hover:bg-gray-200'
							: 'cursor-default active:scale-100'
					}`}
				>
					<div className='relative'>
						<Avatar type={participant.avatar} />
						{Boolean(participant.vote) && (
							<span
								className={`bg-gray-900 w-6 h-6 grid place-items-center rounded-full absolute -top-1.5 -left-1.5 text-white font-bold text-xs  ${
									Boolean(average) ? 'animatecss-flipInY animatecss-faster' : 'animatecss-bounceIn animatecss-faster'
								}`}
							>
								{Boolean(average) ? participant.vote : <CheckIcon className='w-2.5 h-2.5 text-white' />}
							</span>
						)}
					</div>
					<span className='font-medium text-sm whitespace-nowrap'>
						{user.id === participant.id ? `${participant.name} (tú)` : participant.name}
					</span>
				</button>
			))}
			{Boolean(selectedParticipant.id) && (
				<OptionsModal
					isOpen={Boolean(selectedParticipant.id)}
					onClose={() => setSelectedParticipant(INITIAL_PARTICIPANT_DATA)}
					labelPrimary='Expel'
					labelSecondary='Cancel'
					onClickPrimary={handleDelete}
					onClickSecondary={() => setSelectedParticipant(INITIAL_PARTICIPANT_DATA)}
					title={`Do you want to expel ${selectedParticipant?.name}?`}
				/>
			)}
		</section>
	)
}
