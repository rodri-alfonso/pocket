import Page from '@/layouts/Page'

import { db } from '@/firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Planning } from '@/types/planning'
import EmptyStateGuests from '@/components/empty-state-guest'
import { usePlanningState } from '@/hooks/planning'
import { useRouter } from 'next/router'
import withRegistration from '@/utils/with-registration'
import Participants from '@/components/Participants'
import { useRegistration } from '@/context/planning'
import CardSelector from '@/components/CardSelector'

export async function getServerSideProps(ctx: any) {
	const { id } = ctx.query

	const docRef = doc(db, 'plannings', id)
	const docSnap = await getDoc(docRef)

	let planning = null

	if (docSnap.exists()) planning = docSnap.data()

	return {
		props: { planning },
	}
}

interface Props {
	planning: Planning
}

function Room({ planning: initialPlanning }: Props) {
	const router = useRouter()

	const { participants, planning } = usePlanningState({
		initialPlanning,
		planningId: router.query.id as string,
	})

	const { user } = useRegistration()

	const isEmptyParticipants = participants.filter((participant) => participant.name !== planning.host).length === 0

	if (!initialPlanning) return <Page>Room not found</Page>
	if (isEmptyParticipants) return <EmptyStateGuests planningName={planning.name} />

	const currentParticipant = participants.find((participant) => participant.name === user.name)

	function handleReveal() {
		const average = participants.reduce((acc, participant) => acc + participant.vote, 0) / participants.length

		updateDoc(doc(db, 'plannings', router.query.id as string), {
			average,
		})
	}

	function handleEnd() {
		updateDoc(doc(db, 'plannings', router.query.id as string), {
			average: 0,
			participants: participants.map((participant) => ({ ...participant, vote: 0 })),
		})
	}

	return (
		<Page className='flex flex-col justify-between'>
			<h2>{planning.name}</h2>
			<Participants participants={participants} reveal={Boolean(planning.average)} />

			{planning.average ? (
				<div>
					<span>average: {planning.average} </span>
					<button onClick={handleEnd} className='bg-gray-400 rounded-lg px-4 py-2 disabled:opacity-25'>
						close estimation
					</button>
				</div>
			) : (
				<section>
					<div className='bg-gray-200 rounded-md py-20 grid place-items-center w-full max-w-xs mx-auto'>
						<button
							className='bg-gray-400 rounded-lg px-4 py-2 disabled:opacity-25'
							disabled={!currentParticipant?.vote}
							onClick={handleReveal}
						>
							Reveal
						</button>
					</div>
				</section>
			)}

			<CardSelector
				participants={participants}
				currentCard={currentParticipant?.vote}
				revealed={Boolean(planning.average)}
			/>
		</Page>
	)
}

export default withRegistration(Room)
