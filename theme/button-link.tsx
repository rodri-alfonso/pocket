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
			className={`bg-gray-100 p-2 w-full max-w-xs rounded-md text-center active:scale-95 transition-all ${className}`}
		>
			{label}
		</NextLink.default>
	)
}
