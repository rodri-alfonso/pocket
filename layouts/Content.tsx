import F1 from '@/avatars/F1'
import { useRegistration } from '@/context/planning'
import { useRouter } from 'next/router'
import LogoutModal from '@/components/LogoutModal'
import { useState } from 'react'
import Alert from '@/theme/alert'
import BackIcon from '@/assets/icons/Back'
import Link from 'next/link'
import ShareIcon from '@/assets/icons/Share'
import DeleteIcon from '@/assets/icons/Delete'
import planningService from '@/services/planning'
import OptionsModal from '@/components/OptionsModal'

interface Props {
	children: any
	className?: string
}

export default function Content({ children, className = '' }: Props) {
	const router = useRouter()
	const { user } = useRegistration()
	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	function handleShare() {
		navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`).then(() => {
			setIsAlertOpen(true)
		})
	}

	function handleDeletePlanning() {
		planningService.deletePlanning(router.query.id as string).then(() => {
			router.push('/')
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
			<header className='flex items-center justify-between gap-3 '>
				<Link
					href='/'
					className='w-9 h-9 border border-solid border-gray-200 rounded-md  grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-800 hover:text-white '
				>
					<BackIcon className='w-4 h-4 ' />
				</Link>
				<div className='flex gap-2'>
					<OptionsModal
						isOpen={isDeleteOpen}
						onClose={() => setIsDeleteOpen(false)}
						labelPrimary='Delete'
						labelSecondary='Cancel'
						onClickPrimary={handleDeletePlanning}
						onClickSecondary={() => setIsDeleteOpen(false)}
						title='Do you want to delete this campaing?'
					>
						<button
							onClick={() => setIsDeleteOpen(true)}
							className='w-9 h-9 border border-solid border-gray-200  rounded-md  grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-800 hover:text-white '
						>
							<DeleteIcon className='w-4 -ml-0.5' />
						</button>
					</OptionsModal>
					<button
						onClick={handleShare}
						className='w-9 h-9 border border-solid border-gray-200  rounded-md  grid place-items-center active:scale-95 transition-all hover:bg-gray-800 text-gray-800 hover:text-white '
					>
						<ShareIcon className='w-4 -ml-0.5' />
					</button>
					<LogoutModal />
				</div>
				{isAlertOpen && (
					<Alert
						isOpen={isAlertOpen}
						onClose={() => setIsAlertOpen(false)}
						label='Copied link to clipboard!'
						className='top-16 -right-32'
					/>
				)}
			</header>
		)
	}

	return (
		<div className='h-full flex flex-col gap-3'>
			<div className='grid gap-8'>{router.asPath !== '/' ? <SecondHeader /> : <Header />}</div>
			<div className={className}>{children}</div>
		</div>
	)
}
