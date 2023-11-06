import { useEffect } from 'react'

interface Props {
	label: string
	isOpen: boolean
	onClose: () => void
}

export default function Alert({ label, isOpen, onClose }: Props) {
	useEffect(() => {
		if (isOpen) {
			const interval = setTimeout(() => onClose(), 1500)
			return () => clearInterval(interval)
		}
	}, [])

	if (!isOpen) return null

	return (
		<div className='bg-gray-800 rounded-lg p-2 px-3 font-medium text-sm text-white first-letter:uppercase flex items-center gap-4 justify-center text-center absolute top-8 left-0 right-0 w-48 h-12 m-auto transition-all'>
			<label>{label}</label>
		</div>
	)
}
