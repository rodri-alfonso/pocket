import HomeIcon from '@/assets/icons/Home'
import ShareIcon from '@/assets/icons/Share'
import Alert from '@/theme/alert'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import BackIcon from '@/assets/icons/Back'

export default function NavigatorBar() {
	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const router = useRouter()

	const planningName = 'test'

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
	)
}
