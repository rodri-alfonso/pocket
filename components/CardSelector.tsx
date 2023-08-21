import { useCards } from '@/hooks/cards'
import { useState } from 'react'
import { updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
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
		const updatedParticipants = participants.filter((participant: any) => participant.name !== user.name)
		updateDoc(PLANNING_REF_WITH_ID(router.query.id as string), {
			participants: [...updatedParticipants, { ...user, vote: selectedCard }],
		})
	}

	const supportText = selectedCard ? 'You have picked a card to vote' : 'Pick a card and vote!'

	return (
		<Content className='flex flex-col justify-between relative'>
			<div className='grid gap-6 h-full content-between place-items-center'>
				<section className='grid place-items-center gap-2'>
					<h1 className='text-center font-bold text-lg capitalize'>{planningName} planning</h1>
					<span className='bg-gray-200  text-gray-500 font-semibold text-xs rounded-full px-2.5 py-1'>
						{participants.length} participants
					</span>
				</section>

				<h2 className={`text-center transition-all font-medium ${selectedCard ? 'text-gray-800' : 'text-gray-400'}`}>
					{supportText}
				</h2>
				<section className='grid grid-cols-3 gap-4 w-full place-items-center max-w-xs'>
					{cards.map((card, idx) => (
						<button
							className={`border-solid border text-xl grid place-items-center rounded-lg py-8 w-20 font-semibold transition-all active:scale-95 hover:border-gray-500 ${
								selectedCard === card ? 'bg-gray-800 text-white' : 'bg-gray-50 border-gray-200 '
							}`}
							onClick={() => setSelectedCard(card)}
							key={card + idx}
						>
							{card}
						</button>
					))}
				</section>

				<button
					className='bg-gray-800 text-white font-medium rounded-lg px-4 py-2 w-full mx-auto max-w-xs disabled:opacity-25 active:scale-95 transition-all'
					disabled={!selectedCard}
					onClick={handleSelectCard}
				>
					Vote
				</button>
			</div>
		</Content>
	)
}
