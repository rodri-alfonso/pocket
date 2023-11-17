import Page from '@/layouts/Page'
import Content from '@/layouts/Content'
import withAuth from '@/utils/with-auth'
import { useRegistration } from '@/context/planning'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { Planning } from '@/types/planning'
import PlanningCard from '@/components/PlanningCard'
import PlusIcon from '@/assets/icons/Plus'
import PlanningForm from '@/components/PlanningForm'
import { useState } from 'react'

interface Props {
	plannings: Array<Planning & { id: string }>
}

export async function getServerSideProps() {
	const querySnapshot = await getDocs(collection(db, 'plannings'))
	const plannings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

	return {
		props: { plannings },
	}
}

function Home({ plannings }: Props) {
	const { user } = useRegistration()
	const [isOpen, setIsOpen] = useState(false)
	const createdPlannings = plannings.filter((planning) => planning.hostId === user.id)

	if (isOpen)
		return (
			<Page className='flex flex-col justify-between'>
				<PlanningForm onClose={() => setIsOpen(false)} />
			</Page>
		)

	return (
		<Page
			className='flex flex-col justify-between'
			description='Welcome to Pocket, a web app for Agile teams to creating rooms, invite your colleagues and vote to estimate tasks in real time.'
			title='Pocket | Home'
		>
			<Content>
				{isOpen ? (
					<PlanningForm onClose={() => setIsOpen(false)} />
				) : (
					<div className='grid py-12 gap-8 w-full h-full relative'>
						<section className='flex flex-col gap-6'>
							<div className='flex justify-between items-center'>
								<h3 className='text-xl font-bold pl-1'>My plannings</h3>
								<button
									onClick={() => setIsOpen(true)}
									className='w-9 h-9 rounded-md bg-gray-800 active:scale-95 transition-all text-white font-bold grid place-items-center shadow-md'
								>
									<PlusIcon className='w-3.5 h-3.5' />
								</button>
							</div>

							<div className='grid place-items-center gap-3 w-full rounded-xl '>
								{createdPlannings.map((planning) => (
									<PlanningCard key={planning.hostId} {...planning} />
								))}
							</div>
						</section>
					</div>
				)}
			</Content>
		</Page>
	)
}

export default withAuth(Home)
