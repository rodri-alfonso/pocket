import Page from '@/layouts/Page'
import { Planning } from '@/types/planning'
import EmptyStateGuests from '@/components/EmptyStateGuest'
import { usePlanningState } from '@/hooks/planning'
import { useRouter } from 'next/router'
import withAuth from '@/utils/withAuth'
import { useAuth } from '@/context/auth'
import CardSelector from '@/components/CardSelector'
import ResumeView from '@/components/ResumeView'
import NotFound from '@/components/NotFound'
import { getPlanning } from '@/services/planning'

export async function getServerSideProps(ctx: any) {
	const { id } = ctx.query
	const initialPlanning = await getPlanning(id)

	return {
		props: { initialPlanning },
	}
}

interface Props {
	initialPlanning: Planning
}

function Room({ initialPlanning }: Props) {
	const router = useRouter()
	const planningId = router.query.id as string

	if (!initialPlanning) return <NotFound />

	const { planning } = usePlanningState({ initialPlanning, planningId })
	const { user } = useAuth()

	const isEmptyParticipants =
		planning.participants.filter((participant) => participant.name !== initialPlanning.host).length === 0
	const currentParticipant = planning.participants.find((participant) => participant.name === user.name)
	const orderParticipants = planning.participants.sort((a, b) => a.name.localeCompare(b.name))

	if (isEmptyParticipants) return <EmptyStateGuests planning={planning} />

	return (
		<Page>
			{!!currentParticipant?.vote ? (
				<ResumeView participants={orderParticipants} average={planning.average} isHost={planning.hostId === user.id} />
			) : (
				<CardSelector
					participants={orderParticipants}
					revealed={Boolean(planning.average)}
					average={planning.average}
					hostId={planning.hostId}
					votingSystem={planning.votingSystem}
				/>
			)}
		</Page>
	)
}

export default withAuth(Room)
