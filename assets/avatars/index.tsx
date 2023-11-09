import { useEffect, useState } from 'react'

export type AvatarType = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6' | 'M7' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6'

interface AvatarProps {
	type: AvatarType
	className?: string
}

export default function Avatar({ type, className = '' }: AvatarProps) {
	const [component, setComponent] = useState(<div className='bg-gray-100 h-[52px] w-[52px] rounded-xl' />)

	useEffect(() => {
		import(`./${type}.tsx`).then((IconComponent) => setComponent(<IconComponent.default className={className} />))
	}, [type])
	return component
}
