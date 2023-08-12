interface Props {
	label: string
}

export default function Alert({ label }: Props) {
	return (
		<div className='bg-gray-800 rounded-lg p-2 px-3 font-medium text-sm text-white first-letter:uppercase flex items-center gap-4 text-center'>
			<label>{label}</label>
		</div>
	)
}
