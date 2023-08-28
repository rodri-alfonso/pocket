import F1 from '@/avatars/F1'
import { useRegistration } from '@/context/planning'

interface Props {
	children: any
	className?: string
	spreadLayout?: boolean
}

export default function Content({ children, className = '', spreadLayout }: Props) {
	const { user } = useRegistration()

	const DefaultContent = () => <div className={`rounded-3xl p-6 bg-gray-50 h-5/6 ${className}`}>{children}</div>

	const Header = () => {
		return (
			<header className='flex items-center justify-center gap-6'>
				<button className='hover:bg-gray-100  w-auto rounded-xl py-1 px-2 grid place-items-center transition-all active:scale-95'>
					<picture className='grid gap-2 place-items-center'>
						<F1 />
						<h3 className='font-semibold capitalize text-sm'>{user.name}</h3>
					</picture>
				</button>
			</header>
		)
	}

	return (
		<div className='h-full flex flex-col gap-4'>
			<Header />
			{spreadLayout ? children : <DefaultContent />}
		</div>
	)
}
