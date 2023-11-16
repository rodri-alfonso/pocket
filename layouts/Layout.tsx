interface Props {
	children: React.ReactNode
	className?: string
}

export default function Layout({ children, className = '' }: Props) {
	return (
		<main className={`h-[var(--doc-height)] w-full max-md:max-w-none max-md:rounded-none mx-auto p-6 ${className}`}>
			{children}
		</main>
	)
}
