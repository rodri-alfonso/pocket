import F1 from '@/avatars/F1'
import Avatar from '@/avatars'
import { useRegistration } from '@/context/planning'

interface Props {
	children: any
	className?: string
	spreadLayout?: boolean
}

export default function Content({ children, className = '', spreadLayout }: Props) {
	const { user } = useRegistration()

	const DefaultContent = () => <div className={`rounded-3xl p-6 bg-gray-50 h-5/6 ${className}`}>{children}</div>

	return (
		<div className='h-full flex flex-col gap-4'>
			<button className='hover:bg-gray-100  w-auto rounded-xl mx-auto py-1 px-2 grid place-items-center transition-all active:scale-95'>
				<picture className='grid gap-2 place-items-center'>
					{/* <Avatar type='F1' /> */}
					<F1 />
					<h3 className='font-semibold capitalize text-sm'>{user.name}</h3>
				</picture>
			</button>
			{spreadLayout ? children : <DefaultContent />}
		</div>
	)
}
