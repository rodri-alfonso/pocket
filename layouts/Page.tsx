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
		<main className={`h-[var(--doc-height)] flex ${isOpen ? 'pl-4' : 'pl-4'} gap-4`}>
			<Banner onClick={() => setIsOpen(true)} disabled={isOpen || Boolean(user.name)} />
			<div className='h-[var(--doc-height)] w-2/5 relative'>
				<Layout className={className}>{children}</Layout>
			</div>
		</main>
	)
}
