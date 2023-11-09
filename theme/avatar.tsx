import F1 from '@/assets/avatars/F1'
import { AvatarType } from '@/assets/avatars'
import Avatars from '@/assets/avatars'

interface AvatarProps {
	type: AvatarType
	name: string
}

export default function Avatar({ type, name }: AvatarProps) {
	return (
		<picture className='grid gap-2 place-items-center'>
			<Avatars type={type} />
			<h3 className='font-semibold h-5 capitalize text-sm'>{name}</h3>
		</picture>
	)
}
