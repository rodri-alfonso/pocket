import { Participant } from '@/types/planning'
import Button from '@/theme/button'
import { useRouter } from 'next/router'
import Content from '@/layouts/Content'
import Results from './ResumeView/Results'
import Participants from './ResumeView/Participants'
import planningService from '@/services/planning'

interface Props {
	participants: Participant[]
	average: number
}

const { setAverage, resetPlanning } = planningService

export default function ResumeView({ participants, average }: Props) {
	const router = useRouter()
	const plnningId = router.query.id as string
	const hasAverage = Boolean(average)

	function handleReveal() {
		const filteredParticipants = participants.filter((participant) => typeof participant.vote !== 'string')
		console.log('🚀 ~ file: ResumeView.tsx:23 ~ filteredParticipants:', filteredParticipants)
		const average = filteredParticipants.reduce((acc, participant) => acc + participant.vote, 0) / participants.length

		setAverage(plnningId, average)
	}

	function handleEnd() {
		resetPlanning(
			plnningId,
			participants.map((participant) => ({ ...participant, vote: 0 }))
		)
	}

	return (
		<Content className='flex flex-col justify-between relative' spreadLayout>
			<div className='h-full  flex flex-col justify-between'>
				<Participants participants={participants} average={average} />
				<Results average={average} hasAverage={hasAverage} participants={participants} />

				{hasAverage ? (
					<Button onClick={handleEnd} text='Start new planning' />
				) : (
					<Button
						onClick={handleReveal}
						text='Reveal'
						disabled={participants.some((participant) => participant.vote === 0)}
					/>
				)}
			</div>
		</Content>
	)
}
