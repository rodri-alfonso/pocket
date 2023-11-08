interface Props {
	children: React.ReactNode
	className?: string
	title?: string
	description?: string
}

export default function Page({ children, className = '' }: Props) {
	return (
		<div className='bg-white h-[var(--doc-height)]'>
			<main
				className={`h-[var(--doc-height)] bg-white w-full max-w-md max-md:max-w-none max-md:rounded-none mx-auto p-6 ${className}`}
			>
				{children}
			</main>
		</div>
	)
}
