import { Participant } from '@/types/planning'
import { getParticipantsVoteCount } from '@/utils'

interface Card {
	vote: number | string
	isRevealed: boolean
	count: number
}

interface Props {
	participants: Participant[]
	average: number
	hasAverage: boolean
}

const Card = ({ vote, isRevealed, count }: Card) => {
	return (
		<div className='grid place-items-center gap-1'>
			<div
				className={`border-2 border-solid h-16 w-9 grid place-items-center  font-semibold rounded-md ${
					isRevealed ? 'text-gray-600 border-gray-600' : 'text-gray-400 border-gray-400'
				}`}
			>
				{isRevealed ? vote : '?'}
			</div>
			<span className={`px-2.5 py-0.5 rounded-full font-semibold text-xs ${isRevealed ? '' : 'mx-3'}`}>
				{isRevealed ? `${count} ${count > 1 ? 'votes' : 'vote'}` : '...'}
			</span>
		</div>
	)
}

export default function Results({ participants, hasAverage, average }: Props) {
	const Cards = () => {
		const HiddenCards = () => {
			return participants.map((participant, index) => (
				<Card key={participant.name + index} vote={Number(participant.vote)} isRevealed={hasAverage} count={1} />
			))
		}

		const RevealedCards = () => {
			return getParticipantsVoteCount(participants).map(([vote, voteCount], index) => (
				<Card
					key={voteCount + index}
					vote={typeof vote === 'string' ? vote : Number(vote)}
					isRevealed={hasAverage}
					count={voteCount}
				/>
			))
		}

		return <div className='flex'>{Boolean(average) ? <RevealedCards /> : <HiddenCards />}</div>
	}

	return (
		<section className='grid gap-4 place-items-center'>
			<div className='grid place-items-center gap-1'>
				<span className={`font-semibold ${hasAverage ? 'text-gray-800' : 'text-gray-400'}`}>Average</span>
				<div
					className={`w-24 h-32 rounded-xl grid place-items-center font-semibold text-3xl transition-all  ${
						hasAverage ? 'bg-gray-800 text-white' : ' text-gray-400 border-2 border-solid border-gray-400'
					}`}
				>
					{average || '?'}
				</div>
			</div>
			<Cards />
		</section>
	)
}
