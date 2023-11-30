import { useState } from 'react'
import Register from './Register'
import { useIsMobile } from '@/hooks/useWindowSize'
import Banner from './Banner'
import Layout from '@/layouts/Layout'
import Head from 'next/head'

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
		<>
			<Head>
				<link rel='icon' href='/favicon.svg' sizes='<generated>' />
				<title>Pocket | Fast, easy, on-the-go poker planning</title>
				<meta
					name='description'
					content='Welcome to Pocket, a web app for Agile teams to creating rooms, invite your colleagues and vote to estimate tasks in real time.'
					key='desc'
				/>
			</Head>
			<div className={`h-[var(--doc-height)] flex bg-white ${isOpenModal ? '' : ''} gap-4 px-4`}>
				<Banner onClick={() => setIsOpenModal(true)} disabled={isOpenModal} />
				{isOpenModal && (
					<div className='w-2/5 p-4 h-full'>
						<Register onClose={() => setIsOpenModal(false)} />
					</div>
				)}
			</div>
		</>
	)
}
