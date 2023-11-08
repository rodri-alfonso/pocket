import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PlanningProvider } from '@/context/planning'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
	}, [])

	return (
		<PlanningProvider>
			<Component {...pageProps} />
		</PlanningProvider>
	)
}
