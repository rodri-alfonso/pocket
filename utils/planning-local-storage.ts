import { ENVIRONMENTS, isSSR } from './constants'

export const storage = !isSSR && JSON.parse(localStorage.getItem(ENVIRONMENTS.STORAGE_KEY) ?? '{}')
export const setStorage = (value: any) => localStorage.setItem(ENVIRONMENTS.STORAGE_KEY, JSON.stringify(value))
export const removeStorage = () => localStorage.removeItem(ENVIRONMENTS.STORAGE_KEY)
