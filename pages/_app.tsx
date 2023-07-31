import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PlanningProvider } from '@/context/planning'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<PlanningProvider>
			<Component {...pageProps} />
		</PlanningProvider>
	)
}
