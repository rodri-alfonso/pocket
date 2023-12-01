import { DOC_HEIGHT } from '@/utils/constants'
import { useEffect } from 'react'

export function useHeight() {
	useEffect(() => {
		document.documentElement.style.setProperty(DOC_HEIGHT, `${window.innerHeight}px`)
	}, [])
}
