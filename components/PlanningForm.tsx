import Input from '@/theme/Input'
import { useState } from 'react'
import Router from 'next/router'
import { Planning } from '@/types/planning'
import { useAuth } from '@/context/auth'
import { createPlanning } from '@/services/planning'
import Avatar from '@/theme/avatar'
import Button from '@/theme/button'

export default function PlanningForm({ onClose }: any) {
	const [planningName, setPlanningName] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useAuth()

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)
		if (!planningName) return

		const payload: Planning = {
			hostId: user.id,
			participants: [{ ...user, vote: 0 }],
			host: user.name,
			average: 0,
			name: planningName,
			votingSystem: 'fibonacci',
		}

		createPlanning(payload).then((response: any) => Router.push(`/planning/${response.id}`))
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col justify-between h-full w-full max-w-xs mx-auto'>
			<div className='flex flex-col gap-8 items-center'>
				<Avatar type={user.avatar} name={user.name} />
				<h1 className='font-medium text-gray-600 text-lg'>Let's create a planning</h1>
				<Input
					label='Planning Name'
					placeholder='Enter a planning name'
					value={planningName}
					onChange={(e) => setPlanningName(e.target.value)}
				/>
			</div>
			<div className='w-full grid gap-2'>
				<Button
					text={isLoading ? 'Creating' : 'Create'}
					type='submit'
					disabled={!planningName || isLoading}
					onClick={() => {}}
					className='w-full'
					loading={isLoading}
				/>
				<Button type='button' text='Cancel' onClick={onClose} className='w-full text-gray-800' />
			</div>
		</form>
	)
}
