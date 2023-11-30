import { useEffect } from 'react'

const DOC_HEIGHT = '--doc-height'

export function useHeight() {
	useEffect(() => {
		document.documentElement.style.setProperty(DOC_HEIGHT, `${window.innerHeight}px`)
	}, [])
}
