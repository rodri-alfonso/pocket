import { useEffect, useState } from 'react'

export function useIsMobile() {
	const [windowSize, setWindowSize] = useState(window.innerWidth)

	useEffect(() => {
		function handleResize() {
			setWindowSize(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowSize < 600
}
