import Button from './button'

interface ButtonProps {
	labelPrimary: string
	labelSecondary: string
	onClickPrimary?: () => void
	onClickSecondary?: () => void
	className?: string
	disabled?: boolean
}

export default function ButtonDouble({
	labelPrimary,
	labelSecondary,
	onClickPrimary = () => {},
	onClickSecondary = () => {},
	className = '',
	disabled = false,
}: ButtonProps) {
	return (
		<section className={`grid gap-2.5 w-full ${className}`}>
			<button
				className={`bg-gray-800 disabled:opacity-30 disabled:active:scale-100 text-white font-medium px-2 py-3  rounded-md text-center active:scale-95 transition-all`}
				onClick={onClickPrimary}
				type='submit'
				disabled={disabled}
			>
				{labelPrimary}
			</button>
			<Button text={labelSecondary} secondary onClick={onClickSecondary} className='rounded-md' />
		</section>
	)
}
