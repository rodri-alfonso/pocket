import Logo from '@/assets/icons/Logo'
import Link from 'next/link'

interface BannerProps {
	disabled?: boolean
	onClick: () => void
}

const IconLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<Link
		href={href}
		target='_blank'
		rel='noopener noreferrer'
		className='hover:bg-white p-1 rounded-lg active:scale-95 transition-all text-white hover:text-gray-800'
	>
		{children}
	</Link>
)

export default function Banner({ disabled = false, onClick }: BannerProps) {
	return (
		<main className='w-full h-screen flex flex-col justify-between px-10 max-sm:px-4 pb-10 gap-4'>
			<div className='w-full px-8 pt-10'>
				<div className='flex justify-between items-center text-center flex-col gap-10 max-sm:gap-6 max-sm:pb-10'>
					<Logo className='text-gray-800 w-32' />
					<div className='grid gap-7 place-items-center'>
						<h3 className='text-gray-500 font-semibold text-xl max-sm:text-lg'>
							Simplify your Scrum Poker with Pocket.
						</h3>
						<h2 className='text-gray-800 font-black text-6xl max-w-3xl max-sm:text-4xl'>
							Fast, easy, on-the-go poker planning
						</h2>
						<h3 className='text-gray-400 font-medium text-xl max-w-xl max-sm:text-lg'>
							Welcome to Pocket, a web app for creating rooms, invite your colleagues and vote to estimate tasks in real
							time.
						</h3>
					</div>
					<button
						disabled={disabled}
						onClick={onClick}
						className='disabled:opacity-40 px-6 py-3 max-sm:text-base bg-gray-800 text-white rounded-lg text-lg w-auto font-semibold active:scale-95 transition-all'
					>
						Get Started
					</button>
				</div>
			</div>

			<footer className='text-white bg-gray-800 py-4 flex items-center gap-6 w-full max-w-7xl mx-auto flex-wrap justify-between text-center px-6 max-sm:justify-center max-sm:flex-col-reverse max-sm:py-8 rounded-2xl'>
				<div className='grid place-items-center gap-4'>
					<div className='flex gap-2'>
						<IconLink href='https://github.com/rodri-alfonso'>
							<svg width='24' height='30' viewBox='0 0 24 25' fill='none'>
								<path
									d='M12 0.5C5.374 0.5 0 6.00883 0 12.8034C0 18.2394 3.438 22.8511 8.207 24.4782C8.806 24.592 9 24.2106 9 23.8866V21.5962C5.662 22.3405 4.967 20.1444 4.967 20.1444C4.421 18.7223 3.634 18.344 3.634 18.344C2.545 17.5801 3.717 17.5965 3.717 17.5965C4.922 17.6827 5.556 18.8648 5.556 18.8648C6.626 20.7452 8.363 20.2018 9.048 19.887C9.155 19.0924 9.466 18.549 9.81 18.2425C7.145 17.9298 4.343 16.8748 4.343 12.1615C4.343 10.8174 4.812 9.72035 5.579 8.85911C5.455 8.54845 5.044 7.29658 5.696 5.60282C5.696 5.60282 6.704 5.27268 8.997 6.86391C9.954 6.59119 10.98 6.45483 12 6.4497C13.02 6.45483 14.047 6.59119 15.006 6.86391C17.297 5.27268 18.303 5.60282 18.303 5.60282C18.956 7.29761 18.545 8.54948 18.421 8.85911C19.191 9.72035 19.656 10.8184 19.656 12.1615C19.656 16.8871 16.849 17.9277 14.177 18.2322C14.607 18.6136 15 19.3621 15 20.5104V23.8866C15 24.2137 15.192 24.5982 15.801 24.4772C20.566 22.848 24 18.2374 24 12.8034C24 6.00883 18.627 0.5 12 0.5Z'
									fill='currentColor'
								></path>
							</svg>
						</IconLink>

						<IconLink href='https://www.linkedin.com/in/rodrigo-alfonso-/'>
							<svg width='24' height='30' viewBox='0 0 24 25' fill='none'>
								<path
									d='M19 0.5H5C2.239 0.5 0 2.739 0 5.5V19.5C0 22.261 2.239 24.5 5 24.5H19C21.762 24.5 24 22.261 24 19.5V5.5C24 2.739 21.762 0.5 19 0.5ZM8 19.5H5V8.5H8V19.5ZM6.5 7.232C5.534 7.232 4.75 6.442 4.75 5.468C4.75 4.494 5.534 3.704 6.5 3.704C7.466 3.704 8.25 4.494 8.25 5.468C8.25 6.442 7.467 7.232 6.5 7.232ZM20 19.5H17V13.896C17 10.528 13 10.783 13 13.896V19.5H10V8.5H13V10.265C14.396 7.679 20 7.488 20 12.741V19.5Z'
									fill='currentColor'
								></path>
							</svg>
						</IconLink>

						<IconLink href='https://me.roalf.dev/'>
							<svg width='24' height='30' viewBox='0 0 20 20' fill='none'>
								<path
									d='M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 17.93C5.05 17.44 2 14.08 2 10C2 9.38 2.08 8.79 2.21 8.21L7 13V14C7 15.1 7.9 16 9 16V17.93ZM15.9 15.39C15.64 14.58 14.9 14 14 14H13V11C13 10.45 12.55 10 12 10H6V8H8C8.55 8 9 7.55 9 7V5H11C12.1 5 13 4.1 13 3V2.59C15.93 3.78 18 6.65 18 10C18 12.08 17.2 13.97 15.9 15.39Z'
									fill='currentColor'
								/>
							</svg>
						</IconLink>
					</div>
				</div>

				<div className=''>
					<p className='text-sm font-medium w-full'>
						Credits to
						<a
							target='_blank'
							rel='noopener noreferrer'
							href='https://www.drawkit.com/product/notion-style-avatar-creator'
							className='underline underline-offset-4 mx-1 font-bold hover:bg-white hover:text-gray-800 transition-all rounded-md'
						>
							DrawKit
						</a>
						for set of illustrations
					</p>
				</div>

				<Link
					href='https://github.com/rodri-alfonso/pocket-planning'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center gap-2 border border-solid text-sm border-white border-opacity-20 rounded-lg active:scale-95 transition-all p-2 font-medium hover:bg-white hover:text-gray-800'
				>
					<svg width='26' height='26' viewBox='0 0 24 25' fill='none'>
						<path
							d='M12 0.5C5.374 0.5 0 6.00883 0 12.8034C0 18.2394 3.438 22.8511 8.207 24.4782C8.806 24.592 9 24.2106 9 23.8866V21.5962C5.662 22.3405 4.967 20.1444 4.967 20.1444C4.421 18.7223 3.634 18.344 3.634 18.344C2.545 17.5801 3.717 17.5965 3.717 17.5965C4.922 17.6827 5.556 18.8648 5.556 18.8648C6.626 20.7452 8.363 20.2018 9.048 19.887C9.155 19.0924 9.466 18.549 9.81 18.2425C7.145 17.9298 4.343 16.8748 4.343 12.1615C4.343 10.8174 4.812 9.72035 5.579 8.85911C5.455 8.54845 5.044 7.29658 5.696 5.60282C5.696 5.60282 6.704 5.27268 8.997 6.86391C9.954 6.59119 10.98 6.45483 12 6.4497C13.02 6.45483 14.047 6.59119 15.006 6.86391C17.297 5.27268 18.303 5.60282 18.303 5.60282C18.956 7.29761 18.545 8.54948 18.421 8.85911C19.191 9.72035 19.656 10.8184 19.656 12.1615C19.656 16.8871 16.849 17.9277 14.177 18.2322C14.607 18.6136 15 19.3621 15 20.5104V23.8866C15 24.2137 15.192 24.5982 15.801 24.4772C20.566 22.848 24 18.2374 24 12.8034C24 6.00883 18.627 0.5 12 0.5Z'
							fill='currentColor'
						></path>
					</svg>
					<span>Source code</span>
				</Link>
			</footer>
		</main>
	)
}
