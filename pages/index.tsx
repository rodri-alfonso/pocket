import Page from '@/layouts/Page'
import Link from '@/theme/button-link'
import Content from '@/layouts/Content'
import withRegistration from '@/utils/with-registration'
import { useRegistration } from '@/context/planning'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/firebase-config'

export async function getServerSideProps() {
	const querySnapshot = await getDocs(collection(db, 'plannings'))
	const plannings = querySnapshot.docs.map((doc) => {
		return { id: doc.id, ...doc.data() }
	})

	return {
		props: { plannings },
	}
}

function Home({ plannings }) {
	console.log('🚀 ~ file: index.tsx:21 ~ plannings:', plannings)
	const { user } = useRegistration()

	const planning = plannings.find((planning) => planning.hostId === user.id)

	const PlanningPreview = () => {
		return (
			<section className='grid place-items-center rounded-3xl text-white bg-gray-800 px-20 py-6 gap-4'>
				<h2 className='text-lg font-medium'>{planning.name}</h2>
				<div>
					<span className='bg-gray-200 text-gray-600 font-semibold text-sm px-2 py-0.5 rounded-full'>
						{planning.votingSystem}
					</span>
				</div>
				<span className='font-semibold text-sm'>{planning.participants.length} participants</span>
			</section>
		)
	}

	return (
		<Page className='flex flex-col justify-between'>
			<Content>
				<section className='grid gap-4 place-items-center w-full h-full items-end'>
					<div className=' grid place-items-center gap-2'>
						{/* <h3 className='font-semibold'>Existing planning:</h3> */}
						{user.planningId && <PlanningPreview />}
					</div>
					{user.planningId ? (
						<Link href={`/planning/${user.planningId}`} label='Enter at planning' />
					) : (
						<Link href='/create' label='Create Planning' />
					)}
				</section>
			</Content>
		</Page>
	)
}

export default withRegistration(Home)
