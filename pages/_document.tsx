import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='icon' href='/favicon.svg' sizes='<generated>' />
				<title>Pocket</title>
				<meta
					name='description'
					content='Welcome to Pocket, a web app for Agile teams to creating rooms, invite your colleagues and vote to estimate tasks in real time.'
					key='desc'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
