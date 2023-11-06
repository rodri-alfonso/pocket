interface Props {
	className?: string
}

export default function ArrowNarrowIcon({ className }: Props) {
	return (
		<svg width='16' height='8' viewBox='0 0 16 8' fill='none' className={className}>
			<path d='M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z' fill='currentColor' />
		</svg>
	)
}
