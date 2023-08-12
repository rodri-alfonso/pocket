import { Planning } from '@/types/planning'
import Link from 'next/link'
import F1 from '@/avatars/F1'

interface Props extends Planning {
	id: string
}

export default function PlanningCard({ id, name, participants, votingSystem }: Props) {
	return (
		<Link
			href={`/planning/${id}`}
			className='flex bg-white justify-between h-full rounded-2xl text-gray-800 border-solid border border-gray-200 p-6 w-full active:scale-95 transition-all  hover:shadow-md'
		>
			<div className='grid items-center gap-6'>
				<h2 className='font-semibold'>#1 {name}</h2>

				<div className='flex items-center gap-2'>
					<div className='flex items-center '>
						{participants.map((participant, index) => (
							<F1 key={`${index}_${participant}`} className='w-8 h-8  rounded-full -ml-1.5 bg-white' />
						))}
					</div>
				</div>
			</div>

			<div className='flex flex-col items-end justify-between h-full'>
				<button className='border border-solid hover:bg-gray-800 transition-all hover:text-white border-gray-300 rounded-full  w-8 h-8 grid place-items-center font-semibold text-xs '>
					{'>'}
				</button>
				<span className='bg-gray-100 text-gray-500 font-medium text-sm px-2 py-0.5 rounded-full'>{votingSystem}</span>
			</div>
		</Link>
	)
}
