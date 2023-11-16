import { useState } from 'react'
import Register from './Register'
import { useIsMobile } from '@/hooks/useWindowSize'
import Banner from './Banner'

export default function Landing() {
	const isMobile = useIsMobile()
	const [isOpenModal, setIsOpenModal] = useState(false)

	if (isMobile && isOpenModal) return <Register onClose={() => setIsOpenModal(false)} />

	return (
		<div className={`flex bg-white ${isOpenModal ? 'pr-6' : ''}`}>
			<Banner onClick={() => setIsOpenModal(true)} disabled={isOpenModal} />
			{isOpenModal && (
				<div className='w-1/3 py-10 bg-white'>
					<Register onClose={() => setIsOpenModal(false)} />
				</div>
			)}
		</div>
	)
}
