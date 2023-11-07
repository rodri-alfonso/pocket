import { useState } from 'react'
import Input from '@/theme/Input'
import Page from '@/layouts/Page'
import uniqid from 'uniqid'
import { useRegistration } from '@/context/planning'
import Button from '@/theme/button'
import Avatar from '@/theme/avatar'

export default function Register() {
	const [username, setUsername] = useState('')
	const { setRegistration } = useRegistration()

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setRegistration({ name: username, id: uniqid(), avatar: 'F1' })
	}

	return (
		<Page className='grid place-items-center'>
			<div className='h-full w-full bg-gray-50 flex flex-col rounded-2xl p-6'>
				<Avatar name={username} type='F1' />
				<form onSubmit={handleSubmit} className='flex flex-col justify-between items-center h-full'>
					<div className='w-full grid gap-10 text-center'>
						<div className=' w-full rounded-3xl grid gap-6'>
							<h2 className='font-semibold text-lg text-black'>Welcome{username && `, ${username}`}</h2>
							<Input
								label='Choose a Nickname'
								placeholder='Type you nickname...'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
					</div>
					<Button text='Continue' disabled={!username} onClick={() => {}} className='w-full' />
				</form>
			</div>
		</Page>
	)
}
