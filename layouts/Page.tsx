import { useState } from 'react'
import { useIsMobile } from '@/hooks/useWindowSize'
import Banner from '@/components/Banner'
import Layout from './Layout'
import { useRegistration } from '@/context/planning'

interface Props {
	children: React.ReactNode
	className?: string
	title?: string
	description?: string
}

export default function Page({ children, className = '' }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const isMobile = useIsMobile()
	const { user } = useRegistration()

	if (isMobile) return <Layout className={className}>{children}</Layout>

	return (
		<main className={`h-[var(--doc-height)] flex bg-white w-full ${isOpen ? 'pr-6' : ''} overflow-hidden`}>
			<Banner onClick={() => setIsOpen(true)} disabled={isOpen || Boolean(user.name)} />
			<div className='w-1/3  h-[var(--doc-height)]  p-4 pb-10 pl-0'>
				<div className='h-[var(--doc-height)] w-full bg-gray-100 relative rounded-2xl overflow-hidden'>
					<Layout className={className}>{children}</Layout>
				</div>
			</div>
		</main>
	)
}
