import { IconProps } from '../types'

export default function ChevronIcon({ className }: IconProps) {
	return (
		<svg width='7' height='12' viewBox='0 0 7 12' fill='none' className={className}>
			<path
				d='M0.2925 0.293762C-0.0975 0.683762 -0.0975 1.31376 0.2925 1.70376L4.1725 5.58376L0.2925 9.46376C-0.0975 9.85376 -0.0975 10.4838 0.2925 10.8738C0.6825 11.2638 1.3125 11.2638 1.7025 10.8738L6.2925 6.28376C6.6825 5.89376 6.6825 5.26376 6.2925 4.87376L1.7025 0.283762C1.3225 -0.0962379 0.6825 -0.0962377 0.2925 0.293762Z'
				fill='currentColor'
			/>
		</svg>
	)
}
