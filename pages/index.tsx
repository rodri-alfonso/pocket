import Page from '@/layouts/Page'
import Link from '@/theme/button-link'
import Content from '@/layouts/Content'
import withRegistration from '@/utils/with-registration'
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
	const { user } = useRegistration()
	const filteredPlannings = plannings.filter((planning) => planning.hostId === user.id)

	return (
		<Page className='flex flex-col justify-between'>
			<Content>
				<div className='grid gap-4 place-items-center w-full h-full items-end'>
					<h3 className='font-semibold'>Active plannings</h3>
					<section className='h-full w-full flex flex-col items-center gap-8 '>
						<div className='grid place-items-center gap-3 w-full max-w-xs'>
							{filteredPlannings.map((planning) => (
								<PlanningCard key={planning.hostId} {...planning} />
							))}
						</div>
					</section>
					<Link href='/create' label='Create Planning' />
				</div>
			</Content>
		</Page>
	)
}

export default withRegistration(Home)
