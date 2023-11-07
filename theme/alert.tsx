import { useEffect } from 'react'

interface Props {
	label: string
	isOpen: boolean
	onClose: () => void
	children?: React.ReactNode | React.ReactNode[]
	className?: string
}

export default function Alert({ label, isOpen, onClose, className = '' }: Props) {
	useEffect(() => {
		if (isOpen) {
			const interval = setTimeout(() => onClose(), 1000)
			return () => clearInterval(interval)
		}
	}, [])

	if (!isOpen) return null

	return (
		<div
			className={`bg-gray-800 rounded-lg font-medium text-sm text-white first-letter:uppercase flex items-center gap-4 justify-center text-center absolute top-8 left-0 right-0 w-48 h-9 m-auto transition-all ${className}`}
		>
			<label>{label}</label>
		</div>
	)
}
