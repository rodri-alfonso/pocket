import Page from '@/layouts/Page'
import Content from '@/layouts/Content'
import withAuth from '@/utils/withAuth'
import { useAuth } from '@/context/auth'
import { Planning } from '@/types/planning'
import PlanningCard from '@/components/PlanningCard'
import PlusIcon from '@/assets/icons/Plus'
import PlanningForm from '@/components/PlanningForm'
import { useState } from 'react'
import { getAllPlannings } from '@/services/plannings'

interface Props {
	plannings: Array<Planning & { id: string }>
}

export async function getServerSideProps() {
	const plannings = await getAllPlannings()

	return {
		props: { plannings },
	}
}

function Home({ plannings }: Props) {
	const { user } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const createdPlannings = plannings.filter((planning) => planning.hostId === user.id)

	if (isOpen)
		return (
			<Page className='flex flex-col justify-between'>
				<PlanningForm onClose={() => setIsOpen(false)} />
			</Page>
		)

	return (
		<Page className='flex flex-col justify-between'>
			<Content>
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
			</Content>
		</Page>
	)
}

export default withAuth(Home)
