interface Props {
	children: React.ReactNode
	className?: string
	title?: string
	description?: string
}

export default function Page({ children, className = '' }: Props) {
	return (
		<div className='bg-white h-screen '>
			<header></header>
			<main
				className={`h-full bg-white w-full max-w-md max-md:max-w-none max-md:rounded-none mx-auto p-6 ${className}`}
			>
				{children}
			</main>
		</div>
	)
}
