import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
	label: string
	isOpen: boolean
	onClose: () => void
	children?: React.ReactNode | React.ReactNode[]
	className?: string
}

export default function Alert({ label, isOpen, onClose, className = '' }: Props) {
	if (!isOpen) return null

	useEffect(() => {
		if (isOpen) {
			const interval = setTimeout(() => onClose(), 1000)
			return () => clearInterval(interval)
		}
	}, [])

	return (
		<div
			className={`bg-gray-800 rounded-lg font-medium text-sm z-50 text-white first-letter:uppercase flex items-center gap-4 justify-center text-center absolute bottom-5 right-0 left-0 w-48 h-9 m-auto transition-all ${
				isOpen ? 'animatecss-slideInUp animatecss-faster' : ''
			} ${className}`}
		>
			<label>{label}</label>
		</div>
	)
}
