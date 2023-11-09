import { Planning } from '@/types/planning'
import Link from 'next/link'
import Avatar from '@/assets/avatars'

interface Props extends Planning {
	id: string
}

export default function PlanningCard({ id, name, participants, votingSystem }: Props) {
	const planningName = name.toLowerCase().includes('planning') ? name : `${name} planning`

	return (
		<Link
			href={`/planning/${id}`}
			className='flex bg-gray-800 justify-between h-full rounded-2xl text-white border-solid border border-gray-200 p-6 w-full active:scale-95 transition-all  hover:shadow-md'
		>
			<div className='grid items-center gap-6'>
				<h2 className='font-semibold '>{planningName}</h2>

				<div className='flex items-center gap-2'>
					<div className='flex items-center '>
						{participants.map((participant, index) => (
							<Avatar
								type={participant.avatar}
								key={`${index}_${participant}`}
								className='w-8 h-8 text-black  rounded-full -ml-1.5 bg-gray-100'
							/>
						))}
					</div>
				</div>
			</div>

			<div className='flex flex-col items-end justify-between h-full'>
				<span className='border border-solid border-gray-300 text-gray-300 font-medium text-xs px-2.5 py-0.5 rounded-full'>
					{votingSystem}
				</span>
				<span className='border border-solid hover:bg-gray-800 text-gray-800 bg-white transition-all hover:text-white border-gray-300 rounded-full py-0.5 px-3 grid place-items-center font-semibold text-sm'>
					Join
				</span>
			</div>
		</Link>
	)
}
