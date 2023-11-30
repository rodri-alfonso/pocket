import { useState } from 'react'
import Input from '@/theme/Input'
import uniqid from 'uniqid'
import { useAuth } from '@/context/auth'
import Button from '@/theme/button'
import Avatar from '@/theme/avatar'
import Avatars from '@/assets/avatars'
import { AvatarType } from '@/assets/avatars'

const AVATARS_LIST: AvatarType[] = ['F2', 'F3', 'F4', 'F5', 'F6', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7']

export default function Register({ onClose }: any) {
	const [username, setUsername] = useState('')
	const [avatar, setAvatar] = useState<AvatarType>('M6')
	const { login } = useAuth()

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		login({ name: username, id: uniqid(), avatar })
	}

	return (
		<div className='h-full w-full flex flex-col rounded-2xl'>
			<Avatar name={username} type={avatar} />
			<form onSubmit={handleSubmit} className='flex flex-col gap-10 justify-between items-center h-full'>
				<div className='w-full grid gap-10 text-center'>
					<div className=' w-full rounded-3xl grid gap-6'>
						<h2 className='font-semibold text-lg text-black'>Welcome{username && `, ${username}`}</h2>
						<Input
							label='Choose a Nickname'
							placeholder='Type you nickname...'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						{/* To be recognized by others, please enter your username. */}
					</div>
					<section className='w-full grid gap-8 place-items-center max-w-xs mx-auto'>
						<h2 className='font-semibold text-gray-500'>Choose an avatar</h2>
						<div className='grid gap-1 grid-cols-4 w-full justify-items-center'>
							{AVATARS_LIST.map((item) => (
								<button
									key={item}
									type='button'
									onClick={() => setAvatar(item)}
									className={`text-gray-400 rounded-xl hover:bg-gray-200 p-1.5 hover:text-gray-800 transition-all active:scale-95 ${
										item === avatar ? 'text-gray-800 bg-gray-200' : 'text-gray-400'
									}`}
								>
									<Avatars type={item} />
								</button>
							))}
						</div>
					</section>
				</div>
				<div className='w-full grid gap-2'>
					<Button text='Continue' disabled={!username} onClick={() => {}} className='w-full' />
					<Button type='button' text='Cancel' onClick={onClose} className='w-full text-gray-800' />
				</div>
			</form>
		</div>
	)
}
