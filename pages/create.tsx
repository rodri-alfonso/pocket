import Page from '@/layouts/Page'
import Content from '@/layouts/Content'
import PlanningForm from '@/components/PlanningForm'

export default function Create() {
	return (
		<Page>
			<Content className='place-items-center grid'>
				<PlanningForm />
			</Content>
		</Page>
	)
}
