import { useState } from 'react'
import { useIsMobile } from '@/hooks/useWindowSize'
import Page from './Page'
import Landing from '@/components/Landing'

interface Props {
	children: React.ReactNode | React.ReactNode[]
}

export default function Banner({ children }: Props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='flex'>
			<Landing />
			<Page>{children}</Page>
		</div>
	)
}
