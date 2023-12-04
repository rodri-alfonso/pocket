import Modal from '@/theme/modal'
import CloseIcon from '@/assets/icons/Close'
import Button from '@/theme/button'

interface Props {
	title?: string
	labelPrimary?: string
	labelSecondary?: string
	onClickPrimary?: () => void
	onClickSecondary?: () => void
	isOpen: boolean
	onClose: () => void
	children?: React.ReactNode | React.ReactNode[]
	loading?: boolean
	disabled?: boolean
}

export default function OptionsModal({
	isOpen,
	onClose,
	labelPrimary = '',
	labelSecondary = '',
	onClickPrimary = () => {},
	onClickSecondary = () => {},
	children,
	title,
	loading,
	disabled,
}: Props) {
	return (
		<>
			{children}
			{
				<Modal isOpen={isOpen} onClose={onClose} className={`w-4/6 h-auto relative`}>
					<button
						className='absolute top-2 bg-gray-100 right-2 rounded-lg hover:bg-gray-200 hover:text-gray-700 text-gray-500 p-2 active:scale-90 transition-all'
						onClick={onClose}
					>
						<CloseIcon />
					</button>
					<div className='grid justify-center h-full gap-6 py-5 w-4/5 mx-auto'>
						<span className='text-center pb-2 font-semibold text-xl'>{title}</span>
						<div className='w-full px-8 font-semibold'>
							<Button
								className='mb-3 w-full'
								onClick={onClickPrimary}
								text={labelPrimary}
								loading={loading}
								disabled={disabled}
							/>
							<button
								className='border border-solid hover:border-gray-400 hover:text-gray-700 border-gray-300 text-gray-500 px-9 py-2  w-full rounded-xl active:scale-95 transition-all'
								onClick={onClickSecondary}
							>
								{labelSecondary}
							</button>
						</div>
					</div>
				</Modal>
			}
		</>
	)
}
