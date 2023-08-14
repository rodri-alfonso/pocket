import F1 from '@/avatars/F1'
import { Participant } from '@/types/planning'
import Button from '@/theme/button'
import { updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { PLANNING_REF_WITH_ID } from '@/firebase-config'
import Content from '@/layouts/Content'

interface Props {
	participants: Participant[]
	average: number
}

export default function ResumeView({ participants, average }: Props) {
	const router = useRouter()
	const docRef = PLANNING_REF_WITH_ID(router.query.id as string)
	const hasAverage = Boolean(average)

	function handleReveal() {
		const average = participants.reduce((acc, participant) => acc + participant.vote, 0) / participants.length

		updateDoc(docRef, {
			average,
		})
	}

	function handleEnd() {
		updateDoc(docRef, {
			average: 0,
			participants: participants.map((participant) => ({ ...participant, vote: 0 })),
		})
	}

	const Card = ({ vote }) => {
		return (
			<div className='grid place-items-center gap-1'>
				<div className='border-2 border-solid border-gray-600 h-16 w-9 grid place-items-center text-gray-600 font-semibold rounded-md'>
					{vote}
				</div>
				<span className='px-2.5 py-0.5 rounded-full font-semibold text-xs'>{`${vote} ${
					vote > 1 ? 'votes' : 'vote'
				}`}</span>
			</div>
		)
	}
	const CardMock = () => {
		return (
			<div className='grid place-items-center gap-1'>
				<div className='border-2 border-solid border-gray-400 h-16 w-9 grid place-items-center text-gray-400 font-semibold rounded-md'>
					?
				</div>
				<span className='px-2.5 mx-4 text-gray-400 py-0.5 rounded-full font-semibold text-xs'>...</span>
			</div>
		)
	}

	const agreementPercent = `${45}%`

	const AgreementLine = () => {
		return (
			<div className='w-1/2'>
				<div className='flex items-center gap-1 justify-between mb-1'>
					<span className='font-medium text-gray-500'>Agreement:</span>
					<span className='text-sm font-medium text-gray-500'>{agreementPercent}</span>
				</div>
				<div className='w-full  rounded-full h-2.5 bg-gray-300'>
					<div className='bg-gray-800 h-2.5 rounded-full' style={{ width: agreementPercent }}></div>
				</div>
			</div>
		)
	}
	const AgreementMock = () => {
		return (
			<div className='w-1/2'>
				<div className='flex items-center gap-1 justify-between mb-1'>
					<span className='font-medium text-gray-400'>Agreement:</span>
					<span className='text-sm font-medium text-gray-400'>???</span>
				</div>
				<div className='w-full  rounded-full h-2.5 bg-gray-400'>
					<div className='bg-gray-400 h-2.5 rounded-full'></div>
				</div>
			</div>
		)
	}

	const Results = () => {
		return (
			<div className='grid gap-8 place-items-center'>
				<div className='grid place-items-center gap-1'>
					<span className={`font-semibold ${hasAverage ? 'text-gray-800' : 'text-gray-400'}`}>Average</span>
					<div
						className={`w-24 h-32 rounded-xl grid place-items-center font-semibold text-3xl transition-all  ${
							hasAverage ? 'bg-gray-800 text-white' : ' text-gray-400 border-2 border-solid border-gray-400'
						}`}
					>
						{average || '?'}
					</div>
				</div>
				<div className='flex '>
					{participants.map((participant) => {
						return hasAverage ? <Card key={participant.name} vote={participant.vote} /> : <CardMock />
					})}
				</div>
				{hasAverage ? <AgreementLine /> : <AgreementMock />}
			</div>
		)
	}

	return (
		<Content className='flex flex-col justify-between relative' spreadLayout>
			<section className='h-full  flex flex-col justify-between'>
				<div className='p-6 rounded-3xl flex gap-10 w-full  overflow-x-scroll bg-gray-100'>
					{participants.map((participant) => (
						<div
							className={`grid place-items-center gap-2 text-center relative ${
								Boolean(participant.vote) ? '' : 'opacity-30'
							}`}
						>
							<F1 />
							<span className='font-medium text-sm'>{participant.name}</span>
							{Boolean(participant.vote) && (
								<span className='bg-gray-900 w-6 h-6 grid place-items-center rounded-full absolute -top-1 -left-1 text-white font-bold text-xs'>
									{!!average ? participant.vote : 'ok'}
								</span>
							)}
						</div>
					))}
				</div>

				<Results />

				{hasAverage ? (
					<Button onClick={handleEnd} text='Start new planning' />
				) : (
					<Button
						onClick={handleReveal}
						text='Reveal'
						disabled={participants.some((participant) => participant.vote === 0)}
					/>
				)}
			</section>
		</Content>
	)
}
