import MenuIcon from '@/assets/icons/Menu'
import F1 from '@/avatars/F1'
import NavigatorBar from '@/components/NavigatorBar'
import { useRegistration } from '@/context/planning'
import { useRouter } from 'next/router'
import LogoutModal from '@/components/LogoutModal'

interface Props {
	children: any
	className?: string
}

export default function Content({ children, className = '' }: Props) {
	const router = useRouter()
	const { user } = useRegistration()

	const Header = () => {
		return (
			<header className='flex items-center justify-between gap-3'>
				<div className='flex items-center gap-3'>
					<F1 className='w-9 h-9' />
					<h2 className='flex items-center gap-2 font-bold text-gray-700 capitalize'>
						Hi, {user.name} <span>👋</span>
					</h2>
				</div>
				<LogoutModal />
			</header>
		)
	}

	return (
		<div className='h-full flex flex-col gap-3'>
			<div className='grid gap-8'>
				<Header />
				{router.asPath !== '/' && <NavigatorBar />}
			</div>
			{/* {router.asPath !== '/' ? <NavigatorBar /> : <Header />} */}
			{children}
		</div>
	)
}
