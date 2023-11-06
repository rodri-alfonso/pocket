import F1 from '@/avatars/F1'
import { Participant } from '@/types/planning'
import { useRegistration } from '@/context/planning'
import CheckIcon from '@/assets/icons/Check'
import { useState } from 'react'
import Modal from '@/theme/modal'
import planningService from '@/services/planning'
import { useRouter } from 'next/router'

interface Props {
	participants: Participant[]
	average: number
	hostId?: string
}

export default function Participants({ participants, average, hostId }: Props) {
	const router = useRouter()
	const { user } = useRegistration()
	const [selectedParticipant, setSelectedParticipant] = useState(null)

	const isHost = user.id === hostId

	function handleDelete() {
		console.log('deleted', selectedParticipant)
		setSelectedParticipant(null)
		planningService.deleteParticipant(router.query.id as string, selectedParticipant.id, participants)
	}

	return (
		<section className='h-28 px-6 items-center rounded-3xl flex gap-6 w-full overflow-x-scroll bg-gray-100'>
			{participants.map((participant) => (
				<button
					disabled={!isHost}
					onClick={() => participant.id !== user.id && setSelectedParticipant(participant)}
					key={participant.name}
					className={`grid place-items-center gap-2 text-center active:scale-95 transition-all disabled:active:scale-[0px]   p-1 rounded-xl disabled:bg-inherit ${
						Boolean(participant.vote) ? '' : 'opacity-30 '
					} ${isHost ? 'hover:opacity-100 hover:bg-gray-200' : ''}`}
				>
					<div className='relative'>
						<F1 />
						{Boolean(participant.vote) && (
							<span className='bg-gray-900 w-6 h-6 grid place-items-center rounded-full absolute -top-1.5 -left-1.5 text-white font-bold text-xs'>
								{Boolean(average) ? participant.vote : <CheckIcon className='w-2.5 h-2.5 text-white' />}
							</span>
						)}
					</div>
					<span className='font-medium text-sm whitespace-nowrap'>
						{user.id === participant.id ? `${participant.name} (tú)` : participant.name}
					</span>
				</button>
			))}
			{Boolean(selectedParticipant) && (
				<Modal isOpen={Boolean(selectedParticipant)} onClose={() => {}} className='h-auto'>
					<div className='bg-gray-100 p-4'>
						<p>Quieres expulsar a {selectedParticipant?.name}?</p>
						<div className='flex gap-4'>
							<button className='bg-blue-300 text-white px-4 py-2 rounded-lg' onClick={handleDelete}>
								Si, expulsar
							</button>
							<button
								className='border border-solid border-blue-300 px-4 py-2 rounded-lg'
								onClick={() => setSelectedParticipant(null)}
							>
								Cancelar
							</button>
						</div>
					</div>
				</Modal>
			)}
		</section>
	)
}
