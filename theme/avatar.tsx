import { AvatarType } from '@/assets/avatars'
import Avatars from '@/assets/avatars'

interface AvatarProps {
	type: AvatarType
	name: string
	flipped?: boolean
}

export default function Avatar({ type, name, flipped }: AvatarProps) {
	return (
		<picture className='grid gap-2 place-items-center'>
			<Avatars type={type} className={`w-16 h-16 ${flipped ? 'animatecss-flipInY animatecss-faster' : ''}`} />
			<h3 className='font-semibold h-5 capitalize text-sm'>{name}</h3>
		</picture>
	)
}
