import Page from '@/layouts/Page'
import { arrayUnion, getDoc, setDoc } from 'firebase/firestore'
import { Planning } from '@/types/planning'
import EmptyStateGuests from '@/components/empty-state-guest'
import { usePlanningState } from '@/hooks/planning'
import { useRouter } from 'next/router'
import withAuth from '@/utils/with-auth'
import { useRegistration } from '@/context/planning'
import CardSelector from '@/components/CardSelector'
import ResumeView from '@/components/ResumeView'
import { PLANNING_REF_WITH_ID } from '@/firebase-config'
import { useEffect } from 'react'
import { setStorage, storage } from '@/utils/planning-local-storage'

export async function getServerSideProps(ctx: any) {
	const { id } = ctx.query
	const docSnap = await getDoc(PLANNING_REF_WITH_ID(id))

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
	const planningId = router.query.id as string

	const { participants, planning } = usePlanningState({ initialPlanning, planningId })
	const { user } = useRegistration()

	const isEmptyParticipants =
		participants.filter((participant) => participant.name !== initialPlanning.host).length === 0

	useEffect(() => {
		const isUserInParticipants = initialPlanning.participants.some((participant) => participant.id === user.id)

		if (user.name && !isUserInParticipants) {
			setDoc(
				PLANNING_REF_WITH_ID(router.query.id as string),
				{ participants: arrayUnion({ name: user.name, vote: 0, id: user.id, avatar: 'F1' }) },
				{ merge: true }
			)
			setStorage({ ...user, concurrentPlannings: [storage.currentPlannings, planningId] })
		}
	}, [])

	if (!initialPlanning) return <Page>Room not found</Page>
	if (isEmptyParticipants) return <EmptyStateGuests />

	const currentParticipant = participants.find((participant) => participant.name === user.name)

	return (
		<Page>
			{currentParticipant?.vote ? (
				<ResumeView participants={planning.participants} average={planning.average} />
			) : (
				<CardSelector
					participants={participants}
					currentCard={currentParticipant?.vote}
					revealed={Boolean(planning.average)}
					planningName={planning.name}
				/>
			)}
		</Page>
	)
}

export default withAuth(Room)
