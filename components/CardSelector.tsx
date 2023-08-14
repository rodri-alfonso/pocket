import { useCards } from '@/hooks/cards'
import { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { db } from '@/firebase-config'
import { useRegistration } from '@/context/planning'
import { PLANNING_REF_WITH_ID } from '@/firebase-config'
import Content from '@/layouts/Content'

export default function CardSelector({ participants, revealed, planningName }: any) {
	const cards = useCards()
	const [selectedCard, setSelectedCard] = useState(0)
	const router = useRouter()
	const { user } = useRegistration()

	function handleSelectCard() {
		if (revealed) return
		setSelectedCard(selectedCard)
		const updatedParticipants = participants.filter((participant: any) => participant.name !== user.name)
		updateDoc(PLANNING_REF_WITH_ID(router.query.id as string), {
			participants: [...updatedParticipants, { ...user, vote: selectedCard }],
		})
	}

	return (
		<Content className='flex flex-col justify-between relative'>
			<section className='grid gap-6 h-full content-between'>
				<div className='grid place-items-center gap-2'>
					<h1 className='text-center font-bold text-lg capitalize'>{planningName} planning</h1>
					<span className='bg-gray-200  text-gray-500 font-semibold text-xs rounded-full px-2.5 py-1'>
						{participants.length} participants
					</span>
				</div>

				<h2 className='text-center font-medium text-gray-400'>Pick a card and vote!</h2>
				<div className='grid grid-cols-3 gap-4 w-full place-items-center'>
					{cards.map((card, idx) => (
						<button
							className={`border-solid border text-xl grid place-items-center rounded-lg py-8 w-20 font-semibold transition-all ${
								selectedCard === card ? 'bg-gray-800 text-white' : 'bg-gray-50 border-gray-200 '
							}`}
							onClick={() => setSelectedCard(card)}
							key={card + idx}
						>
							{card}
						</button>
					))}
				</div>
				<button
					className='bg-gray-800 text-white font-medium rounded-lg px-4 py-2 w-full mx-auto max-w-xs disabled:opacity-25'
					disabled={!selectedCard}
					onClick={handleSelectCard}
				>
					Vote
				</button>
			</section>
		</Content>
	)
}
