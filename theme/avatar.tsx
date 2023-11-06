import F1 from '@/avatars/F1'

interface AvatarProps {
	type: 'F1'
	name: string
}

export default function Avatar({ type, name }: AvatarProps) {
	return (
		<picture className='grid gap-2 place-items-center'>
			<F1 />
			<h3 className='font-semibold h-5 capitalize text-sm'>{name}</h3>
		</picture>
	)
}
