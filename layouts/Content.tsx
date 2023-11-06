import MenuIcon from '@/assets/icons/Menu'
import F1 from '@/avatars/F1'
import NavigatorBar from '@/components/NavigatorBar'
import { useRegistration } from '@/context/planning'
import { useRouter } from 'next/router'
import LogoutModal from '@/components/LogoutModal'
import { useState } from 'react'
import Alert from '@/theme/alert'
import BackIcon from '@/assets/icons/Back'
import Link from 'next/link'
import ShareIcon from '@/assets/icons/Share'

interface Props {
	children: any
	className?: string
}

export default function Content({ children, className = '' }: Props) {
	const router = useRouter()
	const { user } = useRegistration()
	const [isAlertOpen, setIsAlertOpen] = useState(false)

	function handleShare() {
		navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`).then(() => {
			setIsAlertOpen(true)
		})
	}

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

	const SecondHeader = () => {
		return (
			<header className='flex items-center justify-between gap-3'>
				<Link
					href='/'
					className='w-9 h-9 border border-solid border-gray-200 rounded-md  grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-800 hover:text-white '
				>
					<BackIcon className='w-4 h-4 ' />
				</Link>
				{/* <div className='flex items-center gap-3'>
				<F1 className='w-9 h-9' />
				<h2 className='flex items-center gap-2 font-bold text-gray-700 capitalize'>
					Hi, {user.name} <span>👋</span>
				</h2>
			</div> */}

				<div className='flex gap-2'>
					<button
						onClick={handleShare}
						className='w-9 h-9 border border-solid border-gray-200  rounded-md  grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-800 hover:text-white '
					>
						<ShareIcon className='w-4 -ml-0.5' />
					</button>
					<LogoutModal />
				</div>
				{isAlertOpen && (
					<Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} label='Copied link to clipboard!' />
				)}
			</header>
		)
	}

	return (
		<div className='h-full flex flex-col gap-3'>
			<div className='grid gap-8'>
				{router.asPath !== '/' ? <SecondHeader /> : <Header />}

				{/* {router.asPath !== '/' && <NavigatorBar />} */}
			</div>
			{/* {router.asPath !== '/' ? <NavigatorBar /> : <Header />} */}
			{children}
		</div>
	)
}

/*

	function handleShare() {
		navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`).then(() => {
			setIsAlertOpen(true)
		})
	}

	return (
		<div className='flex justify-between items-center w-full'>
			<Link
				href='/'
				className='w-9 h-9 border border-solid border-gray-200 rounded-md  grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-800 hover:text-white '
			>
				<BackIcon className='w-4 h-4 ' />
			</Link>
			<h1 className='text-center font-bold text-lg capitalize'>{planningName} planning</h1>
			<button
				onClick={handleShare}
				className='w-9 h-9 border border-solid border-gray-200  rounded-md  grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-800 hover:text-white '
			>
				<ShareIcon className='w-4 -ml-0.5' />
			</button>
			{isAlertOpen && (
				<Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} label='Copied link to clipboard!' />
			)}
		</div>

*/
