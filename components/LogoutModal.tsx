import MenuIcon from '@/assets/icons/Menu'
import Modal from '@/theme/modal'
import { useState } from 'react'
import { useRegistration } from '@/context/planning'

export default function LogoutModal() {
	const [isOpen, setIsOpen] = useState(false)
	const { deleteRegistration } = useRegistration()

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className='hover:bg-gray-800 hover:text-white w-9 h-9 rounded-md border border-solid shadow-sm border-gray-200 grid place-items-center text-gray-800 active:scale-95 transition-all'
			>
				<MenuIcon className='w-4 h-4' />
			</button>
			{isOpen && (
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className='w-4/5  h-32 relative'>
					<div className='grid justify-center h-full gap-6'>
						<button
							className='absolute top-2 right-2 rounded-lg hover:bg-gray-200 text-gray-800 w-7 h-7 active:scale-90 transition-all'
							onClick={() => setIsOpen(false)}
						>
							X
						</button>
						<button
							className='mt-auto border border-solid bg-gray-800 text-white px-9 py-2 rounded-xl active:scale-95 transition-all'
							onClick={deleteRegistration}
						>
							Logout
						</button>
					</div>
				</Modal>
			)}
		</>
	)
}
