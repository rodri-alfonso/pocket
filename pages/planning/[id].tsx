import Page from '@/layouts/Page'
import { useCards } from '@/hooks/cards'
import { db } from '@/firebase-config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Planning } from '@/types/planning'
import EmptyStateGuests from '@/components/empty-state-guest'
import { usePlanningState } from '@/hooks/planning'
import { useRouter } from 'next/router'
import { useState, useId } from 'react'
import withRegistration from '@/utils/with-registration'

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

function Room({ planning }: Props) {
	const router = useRouter()
	const cards = useCards()
	const [selectedCard, setSelectedCard] = useState(0)
	const { participants } = usePlanningState({
		initialParticipants: planning.participants,
		planningId: router.query.id as string,
	})

	const isEmptyParticipants = participants.filter((participant) => participant.name !== planning.host).length === 0

	if (!planning) return <Page>Room not found</Page>
	if (isEmptyParticipants) return <EmptyStateGuests planningName={planning.name} />

	function handleSelectCard(card: number) {
		setDoc(doc(db, 'plannings', router.query.id as string), { selectedCard: card }, { merge: true })
		//realizar la consulta de, al doucmento, en el objecto de participants, buscar el usuario que tiene el id del usuario actual, y actualizar el valor de vote
	}

	return (
		<Page className='flex flex-col justify-between'>
			<h2>{planning.name}</h2>

			<section className='absolute left-6 top-40 grid gap-4'>
				{participants.map((user, idx) => (
					<div key={`${user.name}_${idx}`} className='bg-gray-400 rounded-lg w-10 h-10 grid place-items-center'>
						{user.name[0]}
					</div>
				))}
			</section>

			{planning.isEstimateOpen ? (
				<span>close stimation</span>
			) : (
				<section>
					<div className='bg-gray-200 rounded-md py-20 grid place-items-center w-full max-w-xs mx-auto'>
						<button className='bg-gray-400 rounded-lg px-4 py-2 disabled:opacity-25' disabled={!selectedCard}>
							Reveal
						</button>
					</div>
				</section>
			)}

			<section className='flex gap-2 w-full overflow-auto'>
				{cards.map((card, idx) => (
					<button
						className={`bg-gray-200 rounded-lg px-5 py-7 ${selectedCard === card ? 'bg-blue-600' : ''}`}
						onClick={() => setSelectedCard(card)}
						key={card + idx}
					>
						{card}
					</button>
				))}
			</section>
		</Page>
	)
}

export default withRegistration(Room)
