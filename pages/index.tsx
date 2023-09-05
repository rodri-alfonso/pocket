import Page from '@/layouts/Page'
import Link from '@/theme/button-link'
import * as NextLink from 'next/link'
import Content from '@/layouts/Content'
import withAuth from '@/utils/with-auth'
import { useRegistration } from '@/context/planning'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { Planning } from '@/types/planning'
import PlanningCard from '@/components/PlanningCard'

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
	const { user, concurrentPlannings } = useRegistration()

	const createdPlannings = plannings.filter((planning) => planning.hostId === user.id)
	const lastPlannings = plannings.filter(
		(planning) => !concurrentPlannings.includes(planning.id) && planning.hostId !== user.id
	)

	return (
		<Page className='flex flex-col justify-between'>
			<Content>
				<div className='grid gap-8 w-full h-full'>
					<section className='flex flex-col gap-3 overflow-hidden'>
						<h3 className='font-semibold pl-1'>Created plannings</h3>
						<div className='grid place-items-center gap-3 w-full  overflow-y-auto rounded-xl '>
							<NextLink.default
								href='/create'
								className='flex  justify-between h-full rounded-2xl text-gray-800 border-solid border border-gray-200 p-6 w-full active:scale-95 transition-all  hover:shadow-md'
							>
								Create planning
							</NextLink.default>
							{createdPlannings.map((planning) => (
								<PlanningCard key={planning.hostId} {...planning} />
							))}
						</div>
					</section>

					{!!lastPlannings.length && (
						<section className='flex flex-col gap-3 overflow-hidden'>
							<h3 className='font-semibold pl-1'>Last plannings</h3>
							<div className='grid place-items-center gap-3 w-full h-5/6  overflow-y-auto rounded-xl '>
								{lastPlannings.map((planning) => (
									<PlanningCard key={planning.hostId} {...planning} />
								))}
							</div>
						</section>
					)}

					<Link href='/create' label='Create Planning' className='mt-auto mx-auto' />
				</div>
			</Content>
		</Page>
	)
}

export default withAuth(Home)
