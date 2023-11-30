import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/auth'
import Head from 'next/head'
import { useHeight } from '@/hooks/useHeight'

export default function App({ Component, pageProps }: AppProps) {
	useHeight()

	return (
		<AuthProvider>
			<Head>
				<link rel='icon' href='/favicon.svg' sizes='<generated>' />
				<title>Pocket | Fast, easy, on-the-go poker planning</title>
				<meta
					name='description'
					content='Welcome to Pocket, a web app for Agile teams to creating rooms, invite your colleagues and vote to estimate tasks in real time.'
					key='desc'
				/>
			</Head>
			<Component {...pageProps} />
		</AuthProvider>
	)
}
