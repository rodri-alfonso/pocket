import { useCards } from '@/hooks/cards'
import { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { db } from '@/firebase-config'
import { useRegistration } from '@/context/planning'

export default function CardSelector({ participants, currentCard, revealed }: any) {
	const cards = useCards()
	const [selectedCard, setSelectedCard] = useState(currentCard ?? 0)
	const router = useRouter()
	const { user } = useRegistration()

	useEffect(() => {
		if (!currentCard) setSelectedCard(0)
	}, [currentCard])

	function handleSelectCard(card: number) {
		if (revealed) return
		setSelectedCard(card)
		const updatedParticipants = participants.filter((participant: any) => participant.name !== user.name)
		updateDoc(doc(db, 'plannings', router.query.id as string), {
			participants: [...updatedParticipants, { name: user.name, vote: card }],
		})
	}

	return (
		<section className='grid grid-flow-col gap-6 w-full overflow-x-scroll '>
			{cards.map((card, idx) => (
				<button
					className={`border-solid border text-xl rounded-lg py-10 w-20 font-semibold transition-all ${
						selectedCard === card ? 'bg-gray-800 text-white' : 'bg-gray-50 border-gray-200 '
					}`}
					onClick={() => handleSelectCard(card)}
					key={card + idx}
				>
					{card}
				</button>
			))}
		</section>
	)
}
