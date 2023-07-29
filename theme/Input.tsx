interface Props {
	label: string
	placeholder: string
	value?: string
	ref?: any
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ label, ...props }: Props) {
	return (
		<div className='grid gap-1'>
			<label>{label}</label>
			<input type='text' className='border-2 border-gray-300 rounded-md w-full p-2' {...props} />
		</div>
	)
}
