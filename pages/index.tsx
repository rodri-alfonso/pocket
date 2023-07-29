import Page from '@/layouts/Page'
import Link from '@/theme/button-link'

export default function Home() {
	return (
		<Page className='flex flex-col justify-between'>
			<picture className='rounded-md py-24 bg-gray-200'></picture>

			<section className='grid gap-4 place-items-center'>
				<Link href='/create' label='Create' />
				<Link href='/join' label='Join' />
			</section>
		</Page>
	)
}
