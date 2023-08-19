import F1 from '@/avatars/F1'
import { Participant } from '@/types/planning'
import { useRegistration } from '@/context/planning'
import CheckIcon from '@/assets/icons/Check'

interface Props {
	participants: Participant[]
	average: number
}

export default function Participants({ participants, average }: Props) {
	const { user } = useRegistration()

	return (
		<section className='p-6 rounded-3xl flex gap-10 w-full  overflow-x-scroll bg-gray-100'>
			{participants.map((participant) => (
				<div
					key={participant.name}
					className={`grid place-items-center gap-2 text-center relative ${
						Boolean(participant.vote) ? '' : 'opacity-30'
					}`}
				>
					<F1 />
					<span className='font-medium text-sm'>
						{user.id === participant.id ? `${participant.name} (tú)` : participant.name}
					</span>
					{Boolean(participant.vote) && (
						<span className='bg-gray-900 w-6 h-6 grid place-items-center rounded-full absolute -top-1 -left-1 text-white font-bold text-xs'>
							{Boolean(average) ? participant.vote : <CheckIcon className='w-2.5 h-2.5 text-white' />}
						</span>
					)}
				</div>
			))}
		</section>
	)
}
