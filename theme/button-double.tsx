interface ButtonProps {
	labelPrimary: string
	labelSecondary: string
	onClickPrimary: () => void
	onClickSecondary: () => void
	className?: string
}

export default function ButtonDouble({
	labelPrimary,
	labelSecondary,
	onClickPrimary,
	onClickSecondary,
	className = '',
}: ButtonProps) {
	return (
		<div className={`grid gap-2 w-full max-w-sm mx-auto ${className}`}>
			<button
				className={`bg-gray-800 text-white font-medium px-2 py-3  rounded-md text-center active:scale-95 transition-all`}
				onClick={onClickPrimary}
				type='submit'
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
