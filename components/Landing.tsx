import { useState } from 'react'
import Register from './Register'
import { useIsMobile } from '@/hooks/useWindowSize'
import Banner from './Banner'
import Layout from '@/layouts/Layout'

export default function Landing() {
	const isMobile = useIsMobile()
	const [isOpenModal, setIsOpenModal] = useState(false)

	if (isMobile && isOpenModal)
		return (
			<Layout>
				<Register onClose={() => setIsOpenModal(false)} />
			</Layout>
		)

	return (
		<div className={`h-[var(--doc-height)] flex bg-white ${isOpenModal ? '' : ''} gap-4 px-4`}>
			<Banner onClick={() => setIsOpenModal(true)} disabled={isOpenModal} />
			{isOpenModal && (
				<div className='w-2/5 p-4 h-full'>
					<Register onClose={() => setIsOpenModal(false)} />
				</div>
			)}
		</div>
	)
}
