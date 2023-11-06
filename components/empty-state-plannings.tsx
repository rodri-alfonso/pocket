import { useState } from 'react'
import Modal from '@/theme/modal'
import PlanningForm from './PlanningForm'
import Button from '@/theme/button'

export default function EmptyStatePlannings() {
	const [isOpen, setIsOpen] = useState(false)

	if (isOpen) return <PlanningForm onClose={() => setIsOpen(false)} />

	return (
		<section className='flex flex-col gap-10 items-center'>
			<div className='text-center p-2 grid gap-2'>
				<div className='w-full bg-gray-200 rounded-lg h-56' />
				<p>Aun no hay plannings creadas, crear plannings</p>
			</div>

			<Button text='Crear Plannings' onClick={() => setIsOpen(true)} />
		</section>
	)
}
