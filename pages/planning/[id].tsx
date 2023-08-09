import Page from '@/layouts/Page'
import { db } from '@/firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { Planning } from '@/types/planning'
import EmptyStateGuests from '@/components/empty-state-guest'
import { usePlanningState } from '@/hooks/planning'
import { useRouter } from 'next/router'
import withRegistration from '@/utils/with-registration'
import Participants from '@/components/Participants'
import { useRegistration } from '@/context/planning'
import CardSelector from '@/components/CardSelector'
import Content from '@/layouts/Content'
import ResumeView from '@/components/ResumeView'

export async function getServerSideProps(ctx: any) {
	const { id } = ctx.query

	const docRef = doc(db, 'plannings', id)
	const docSnap = await getDoc(docRef)

	let planning = null

	if (docSnap.exists()) planning = docSnap.data()

	return {
		props: { planning },
	}
}

interface Props {
	planning: Planning
}

function Room({ planning: initialPlanning }: Props) {
	const router = useRouter()

	const { participants, planning } = usePlanningState({
		initialPlanning,
		planningId: router.query.id as string,
	})

	const { user } = useRegistration()

	const isEmptyParticipants = participants.filter((participant) => participant.name !== planning.host).length === 0

	if (!initialPlanning) return <Page>Room not found</Page>
	if (isEmptyParticipants) return <EmptyStateGuests planningName={planning.name} />

	const currentParticipant = participants.find((participant) => participant.name === user.name)

	const SelectorView = () => {
		return (
			<Content className='flex flex-col justify-between relative'>
				<CardSelector
					participants={participants}
					currentCard={currentParticipant?.vote}
					revealed={Boolean(planning.average)}
					planningName={planning.name}
				/>
			</Content>
		)
	}

	const ResumeViewComponent = () => {
		return (
			<Content className='flex flex-col justify-between relative' spreadLayout>
				<ResumeView participants={planning.participants} average={planning.average} />
			</Content>
		)
	}

	return <Page>{currentParticipant?.vote ? <ResumeViewComponent /> : <SelectorView />}</Page>
}

export default withRegistration(Room)
