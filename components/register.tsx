import { useState } from 'react'
import Input from '@/theme/Input'
import Page from '@/layouts/Page'
import uniqid from 'uniqid'
import { useRegistration } from '@/context/planning'
import Button from '@/theme/button'
import F1 from '@/avatars/F1'
import { useRouter } from 'next/router'

export default function Register() {
	const [username, setUsername] = useState('')
	const router = useRouter()
	const { setRegistration, setCurrentPlanning } = useRegistration()

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setRegistration({ name: username, id: uniqid(), avatar: 'F1' })
		// setCurrentPlanning(router.query.id as string)
	}

	return (
		<Page className='grid place-items-center'>
			<div className='h-3/4 w-full bg-gray-100 flex flex-col gap-4 rounded-2xl p-6'>
				<picture className='grid gap-2 place-items-center'>
					<F1 />
					<h3 className='font-semibold h-5 capitalize text-sm'>{username}</h3>
				</picture>
				<form onSubmit={handleSubmit} className='flex flex-col justify-between items-center h-full p-6'>
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

/*

GUARDAR SESIONES:

Logearte, crear un perfil, plannings, etc y cuando te desologuees, que se guarde en localstorage tus datos y cuando vuelvas a entrar, te pregunte si queres usar
ese perfil u crear uno nuevo. Si seleccionas otro perfil, ese perfil se borra con todo lo que tenga. 

O caso contrario, que en el splash, te aparezca el perfil y una cruz para eliminarlo. 

O cuando alguien se desloguee, que se borre TODO lo que tenía ésa cuenta. 
 */
