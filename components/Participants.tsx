import { Participant } from '@/types/planning'

interface Props {
	participants: Participant[]
	reveal: boolean
}

export default function Participants({ participants, reveal }: Props) {
	const Participant = ({ name, vote }: any) => {
		return (
			<div className='grid gap-2 place-items-center relative'>
				<div
					className={`border-solid border border-gray-200 bg-gray-100 font-semibold uppercase text-gray-600 rounded-2xl w-14 h-14 grid place-items-center ${
						Boolean(vote) ? 'border-2 border-solid  border-blue-600 bg-blue-100 ' : ''
					}`}
				>
					{name[0]}
				</div>
				<h3 className='font-medium capitalize text-sm'>{name}</h3>
				{Boolean(vote) && (
					<div className='absolute text-sm -top-2 -left-2 text-white bg-gray-600 w-6 h-6 rounded-full grid place-items-center'>
						{reveal ? vote : '👍🏻'}
					</div>
				)}
			</div>
		)
	}

	return (
		<div className='grid gap-2'>
			<section className='flex gap-6 overflow-x-auto p-2'>
				{participants.map((user, idx) => (
					<Participant name={user.name} key={`${user.name}_${idx}`} vote={user.vote} />
				))}
			</section>
		</div>
	)
}
