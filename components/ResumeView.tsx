import { Participant } from '@/types/planning'
import Button from '@/theme/button'
import { updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { PLANNING_REF_WITH_ID } from '@/firebase-config'
import Content from '@/layouts/Content'
import Results from './ResumeView/Results'
import Participants from './ResumeView/Participants'

interface Props {
	participants: Participant[]
	average: number
}

export default function ResumeView({ participants, average }: Props) {
	const router = useRouter()
	const docRef = PLANNING_REF_WITH_ID(router.query.id as string)
	const hasAverage = Boolean(average)

	function handleReveal() {
		const average = participants.reduce((acc, participant) => acc + participant.vote, 0) / participants.length

		updateDoc(docRef, {
			average,
		})
	}

	function handleEnd() {
		updateDoc(docRef, {
			average: 0,
			participants: participants.map((participant) => ({ ...participant, vote: 0 })),
		})
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
