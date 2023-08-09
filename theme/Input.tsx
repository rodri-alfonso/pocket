interface Props {
	label: string
	placeholder: string
	value?: string
	ref?: any
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ label, ...props }: Props) {
	return (
		<div className='grid gap-2 w-full text-center'>
			<label className='font-semibold text-gray-500'>{label}</label>
			<input type='text' className='border-2 border-gray-400 rounded-lg w-full p-2 px-4' required {...props} />
		</div>
	)
}
