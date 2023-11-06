interface Props {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	className?: string
}

export default function Modal({ children, isOpen, onClose, className = '' }: Props) {
	return (
		<dialog
			open={isOpen}
			onClose={onClose}
			className='bg-black bg-opacity-80 absolute top-0 grid place-items-center w-full z-10 h-full transition-all'
		>
			<section className={`w-full max-w-sm rounded-xl h-1/2 bg-white p-6 ${className}`}>{children}</section>
		</dialog>
	)
}
