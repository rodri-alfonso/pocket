interface Props {
	children: React.ReactNode
	className?: string
}

export default function Page({ children, className = '' }: Props) {
	return (
		<div>
			<header></header>
			<main className={`h-screen p-6 ${className}`}>{children}</main>
		</div>
	)
}
