import Page from '@/layouts/Page'
import { useCards } from '@/hooks/cards'

export default function Room() {
	const cards = useCards()

	const USERS_MOCK = [{ name: 'Lean' }, { name: 'Roan' }]

	return (
		<Page className='flex flex-col justify-between'>
			<h2>Room Specific</h2>

			<section className='absolute left-6 top-40 grid gap-4'>
				{USERS_MOCK.map((user, idx) => (
					<div key={`${user.name}_${idx}`} className='bg-gray-400 rounded-lg w-10 h-10 grid place-items-center'>
						{user.name[0]}
					</div>
				))}
			</section>

			<section>
				<div className='bg-gray-200 rounded-md py-20 grid place-items-center w-full max-w-xs mx-auto'>
					<button className='bg-gray-400 rounded-lg px-4 py-2'>Reveal</button>
				</div>
			</section>

			<section className='flex gap-2 w-full overflow-auto'>
				{cards.map((card, idx) => (
					<button className='bg-gray-200 rounded-lg px-5 py-7' key={card + idx}>
						{card}
					</button>
				))}
			</section>
		</Page>
	)
}
