import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRegistration } from '@/context/planning'
import { arrayUnion, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { PLANNING_REF_WITH_ID } from '@/firebase-config'

interface Props {
	planningName: string
}

export default function EmptyStateGuests({ planningName }: Props) {
	const router = useRouter()
	const planningLink = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`
	const { user, setRegistration } = useRegistration()
	const docRef = PLANNING_REF_WITH_ID(router.query.id as string)

	useEffect(() => {
		//mejorar la sintaxis de esto y hacerlo mas legible
		getDoc(docRef).then((res) => {
			if (!res.exists()) return

			if (res.data().participants.some((participant) => participant.id === user.id)) {
				console.log('YA estaba')
				// setRegistration(user)
			} else {
				console.log('NO estaba')
				setDoc(
					docRef,
					{ participants: arrayUnion({ name: user.name, vote: 0, id: user.id, avatar: 'F1' }) },
					{ merge: true }
				).then(() => {
					setRegistration(user)
				})
			}
		})
	}, [])

	function handleCopyLink() {
		navigator.clipboard.writeText(planningLink).then(() => {
			alert('copied')
		})
	}

	return (
		<Page>
			<span>hey, maybe you have to invite guests to your planning</span>
			<Input value={planningLink} label='' placeholder='' onChange={(e) => {}} />
			<button className='bg-gray-200 p-2' onClick={handleCopyLink}>
				Copy invitation link
			</button>
		</Page>
	)
}
