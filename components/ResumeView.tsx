import { Participant } from '@/types/planning'
import Button from '@/theme/button'
import { useRouter } from 'next/router'
import Content from '@/layouts/Content'
import Results from './ResumeView/Results'
import Participants from './ResumeView/Participants'
import { setPlanningAverage, resetPlanning } from '@/services/planning'
import confetti from 'canvas-confetti'
import { useIsMobile } from '@/hooks/useWindowSize'

interface Props {
	participants: Participant[]
	average: number
	isHost: boolean
}

export default function ResumeView({ participants, average, isHost }: Props) {
	const isMobile = useIsMobile()
	const router = useRouter()
	const plnningId = router.query.id as string
	const hasAverage = Boolean(average)

	function handleReveal() {
		const filteredParticipants = participants.filter((participant) => typeof participant.vote !== 'string')
		const average = filteredParticipants.reduce((acc, participant) => acc + participant.vote, 0) / participants.length

		const isAverage = filteredParticipants.every((participant) => participant.vote === average)
		if (isAverage)
			confetti({ particleCount: 200, spread: 100, origin: isMobile ? { y: 0.5, x: 0.5 } : { y: 0.6, x: 0.86 } })
		setPlanningAverage(plnningId, average)
	}

	function handleEnd() {
		resetPlanning(
			plnningId,
			participants.map((participant) => ({ ...participant, vote: 0 }))
		)
	}

	return (
		<Content className='flex h-full flex-col justify-between relative' isHost={isHost}>
			<div className='h-full pt-4 flex flex-col justify-between'>
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
