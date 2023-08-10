import Page from '@/layouts/Page'
import Link from '@/theme/button-link'
import * as NextLink from 'next/link'
import Content from '@/layouts/Content'
import withRegistration from '@/utils/with-registration'
import { useRegistration } from '@/context/planning'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/firebase-config'
import F1 from '@/avatars/F1'

export async function getServerSideProps() {
	const querySnapshot = await getDocs(collection(db, 'plannings'))
	const plannings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

	return {
		props: { plannings },
	}
}

function Home({ plannings }) {
	const { user } = useRegistration()

	const planning = plannings.find((planning) => planning.hostId === user.id)

	const planningCounter = 2 - plannings.length

	const PlanningPreview = ({ name, id, participants }) => {
		return (
			<NextLink.default
				href={`/planning/${id}`}
				className='flex bg-white justify-between h-full rounded-2xl text-gray-800 border-solid border border-gray-200 p-6 w-full active:scale-95 transition-all  hover:shadow-md'
			>
				<div className='grid items-center gap-6'>
					<h2 className='font-semibold'>#1 {planning.name}</h2>

					<div className='flex items-center gap-2'>
						<div className='flex items-center '>
							{participants.map((participant) => (
								<F1 className='w-8 h-8  rounded-full -ml-1.5 bg-white' />
							))}
						</div>
					</div>
				</div>

				<div className='flex flex-col items-end justify-between h-full'>
					<button className='border border-solid hover:bg-gray-800 transition-all hover:text-white border-gray-300 rounded-full  w-8 h-8 grid place-items-center font-semibold text-xs '>
						{'>'}
					</button>
					<span className='bg-gray-100 text-gray-500 font-medium text-sm px-2 py-0.5 rounded-full'>
						{planning.votingSystem}
					</span>
				</div>
			</NextLink.default>
		)
	}

	const Alert = () => {
		return (
			<div className='bg-gray-800 rounded-lg p-2 px-3 font-medium text-sm text-white first-letter:uppercase flex items-center gap-4 text-center'>
				<span>You have {planningCounter} free planning left</span>
				{/* <button className='w-7 h-7 grid place-items-center bg-gray-800 hover:bg-gray-700 rounded-lg font-bold text-sm'>
					x
				</button> */}
			</div>
		)
	}

	return (
		<Page className='flex flex-col justify-between'>
			<Content>
				<section className='grid gap-4 place-items-center w-full h-full items-end'>
					<div className='h-full w-full flex flex-col items-center gap-8 '>
						<Alert />
						<div className='grid place-items-center gap-3 w-full max-w-xs'>
							{/* <h3 className='font-semibold'>Existing planning:</h3> */}
							{user.planningId &&
								plannings.map((planning) => (
									<PlanningPreview key={planning.name} id={planning.id} participants={planning.participants} />
								))}
						</div>
					</div>
					<Link href='/create' label='Create Planning' />
				</section>
			</Content>
		</Page>
	)
}

export default withRegistration(Home)
