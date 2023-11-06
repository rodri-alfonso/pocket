import MenuIcon from '@/assets/icons/Menu'
import Modal from '@/theme/modal'
import { useState } from 'react'
import { useRegistration } from '@/context/planning'
import CloseIcon from '@/assets/icons/Close'
import ButtonDouble from '@/theme/button-double'

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
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className='w-4/6 h-auto relative'>
					<button
						className='absolute top-2 bg-gray-100 right-2 rounded-lg hover:bg-gray-200 hover:text-gray-700 text-gray-500 p-2 active:scale-90 transition-all'
						onClick={() => setIsOpen(false)}
					>
						<CloseIcon />
					</button>
					<div className='grid justify-center h-full gap-6 py-6 w-4/5 mx-auto'>
						<span className='text-center pb-2 font-semibold text-xl'>Settings</span>
						<div className='w-56 font-semibold'>
							<button
								className='mb-3 bg-gray-800 text-white px-9 w-full py-2 rounded-xl active:scale-95 transition-all'
								onClick={deleteRegistration}
							>
								Log out
							</button>
							<button
								className='border border-solid hover:border-gray-200 hover:underline hover:text-gray-700 border-gray-300 text-gray-500 px-9 py-2  w-full rounded-xl active:scale-95 transition-all'
								onClick={() => setIsOpen(false)}
							>
								Delete account
							</button>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}
