export default function Home() {
	return (
		<main className={`flex min-h-screen flex-col items-center gap-20 p-24`}>
			<button className='rounded-lg disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2.5 disabled:active:scale-100 bg-green-600 border-green-600 transition-all font-medium active:scale-95'>
				click!
			</button>
		</main>
	)
}
