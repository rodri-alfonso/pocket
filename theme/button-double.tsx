interface ButtonProps {
	labelPrimary: string
	labelSecondary: string
	onClickPrimary: () => void
	onClickSecondary: () => void
	className?: string
	disabled?: boolean
}

export default function ButtonDouble({
	labelPrimary,
	labelSecondary,
	onClickPrimary,
	onClickSecondary,
	className = '',
	disabled = false,
}: ButtonProps) {
	return (
		<div className={`grid gap-2  ${className}`}>
			<button
				className={`bg-gray-800 disabled:opacity-30 disabled:active:scale-100 text-white font-medium px-2 py-3  rounded-md text-center active:scale-95 transition-all`}
				onClick={onClickPrimary}
				type='submit'
				disabled={disabled}
			>
				{labelPrimary}
			</button>
			<button
				onClick={onClickSecondary}
				className={`bg-white  text-gray-800 hover:bg-gray-100 font-medium px-2 py-3  rounded-md text-center active:scale-95 transition-all`}
			>
				{labelSecondary}
			</button>
		</div>
	)
}
