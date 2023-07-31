import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useRouter } from 'next/router'

interface Props {
	planningName: string
}

export default function EmptyStateGuests({ planningName }: Props) {
	const router = useRouter()
	const planningLink = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`

	function handleCopyLink() {
		navigator.clipboard.writeText(planningLink).then(() => {
			alert('copied')
		})
	}

	return (
		<Page>
			<span>{planningName}</span>
			<span>hey, maybe you have to invite guests to your planning</span>
			<Input value={planningLink} label='' placeholder='' onChange={(e) => {}} />
			<button className='bg-gray-200 p-2' onClick={handleCopyLink}>
				Copy invitation link
			</button>
		</Page>
	)
}
