import { useState } from 'react'
import { useIsMobile } from '@/hooks/useWindowSize'
import Banner from '@/components/Banner'
import Layout from './Layout'
import { useAuth } from '@/context/auth'
import { useRouter } from 'next/router'

interface Props {
	children: React.ReactNode
	className?: string
}

export default function Page({ children, className = '' }: Props) {
	const router = useRouter()
	const planningId = router.query.id
	const [isOpen, setIsOpen] = useState(Boolean(planningId))
	const isMobile = useIsMobile()
	const { user } = useAuth()

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
