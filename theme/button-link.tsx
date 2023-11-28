import * as NextLink from 'next/link'

interface Props {
	href: string
	label: string
	className?: string
}

export default function Link({ href, label, className = '' }: Props) {
	return (
		<NextLink.default
			href={href}
			className={`disabled:scale-100 disabled:cursor-not-allowed px-4 py-2 active:scale-95 rounded-lg transition-all font-semibold disabled:opacity-30 bg-gray-800 text-white 
			${className}`}
		>
			{label}
		</NextLink.default>
	)
}
