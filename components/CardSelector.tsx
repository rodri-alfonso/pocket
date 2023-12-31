import { VOTING_SYSTEM_MAP } from '@/utils/config'
import { useState } from 'react'
import { updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { PLANNING_REF_BY_ID } from '@/firebase-config'
import Content from '@/layouts/Content'
import Participants from './ResumeView/Participants'
import { VotingSystem } from '@/types/planning'

interface CardSelectorProps {
	participants: any
	votingSystem: VotingSystem
	revealed: boolean
	average: number
	hostId: string
}

export default function CardSelector({ participants, votingSystem, revealed, average, hostId }: CardSelectorProps) {
	const [selectedCard, setSelectedCard] = useState<string | number>(0)
	const router = useRouter()
	const { user } = useAuth()

	const cards = VOTING_SYSTEM_MAP[votingSystem]

	function handleSelectCard() {
		if (revealed) return
		const updatedParticipants = participants.filter((participant: any) => participant.name !== user.name)
		updateDoc(PLANNING_REF_BY_ID(router.query.id as string), {
			participants: [...updatedParticipants, { ...user, vote: selectedCard }],
		})
	}

	const supportText = selectedCard ? 'You have picked a card to vote' : 'Pick a card to vote!'

	return (
		<Content isHost={hostId === user.id}>
			<div className='h-full flex flex-col gap-4 justify-between items-center pt-4 w-full'>
				<Participants participants={participants} average={average} hostId={hostId} />
				<div className='grid gap-6 justify-center'>
					<h2
						className={`text-center transition-all font-medium  rounded-full text-sm py-0.5 px-3 ${
							selectedCard ? 'text-white bg-gray-800 animatecss-pulse animatecss-faster' : 'text-gray-500 bg-gray-100'
						}`}
					>
						{supportText}
					</h2>
					<section className='grid grid-cols-3 gap-4 w-full place-items-center max-w-xs h-full sm:grid-cols-4'>
						{cards.map((card: string | number, idx) => (
							<button
								className={`border-solid border text-xl grid place-items-center rounded-lg w-16 font-semibold h-20 transition-all active:scale-95 hover:border-gray-500 ${
									selectedCard === card ? 'bg-gray-800 text-white' : 'bg-gray-50 border-gray-200 '
								}`}
								onClick={() => setSelectedCard(card)}
								key={`${card}_${idx}`}
							>
								{card}
							</button>
						))}
					</section>
				</div>

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
