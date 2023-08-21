import F1 from '@/avatars/F1'
import Avatar from '@/avatars'
import { useRegistration } from '@/context/planning'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HomeIcon from '@/assets/icons/Home'
import ShareIcon from '@/assets/icons/Share'

interface Props {
	children: any
	className?: string
	spreadLayout?: boolean
}

export default function Content({ children, className = '', spreadLayout }: Props) {
	const { user } = useRegistration()
	const router = useRouter()

	const isInPlanning = router.pathname === '/planning/[id]'

	const DefaultContent = () => <div className={`rounded-3xl p-6 bg-gray-50 h-5/6 ${className}`}>{children}</div>

	const Header = () => {
		return (
			<header className='flex items-center justify-center gap-6'>
				{isInPlanning && (
					<Link
						href='/'
						className='w-9 h-9 border border-solid  bg-gray-100 rounded-lg grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-700 hover:text-white '
					>
						<HomeIcon className='w-4 h-4 ' />
					</Link>
				)}
				<button className='hover:bg-gray-100  w-auto rounded-xl py-1 px-2 grid place-items-center transition-all active:scale-95'>
					<picture className='grid gap-2 place-items-center'>
						{/* <Avatar type='F1' /> */}
						<F1 />
						<h3 className='font-semibold capitalize text-sm'>{user.name}</h3>
					</picture>
				</button>

				{isInPlanning && (
					<button className='w-9 h-9 border border-solid  bg-gray-100 rounded-lg grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-700 hover:text-white '>
						<ShareIcon className='w-4 -ml-0.5' />
					</button>
				)}
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
