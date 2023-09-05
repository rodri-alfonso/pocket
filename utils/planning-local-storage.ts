import { ENVIRONMENTS, isSSR } from './constants'

export const storage = !isSSR && JSON.parse(localStorage.getItem(ENVIRONMENTS.STORAGE_KEY) ?? '{}')
export const setStorage = (value: any) => localStorage.setItem(ENVIRONMENTS.STORAGE_KEY, JSON.stringify(value))
export const removeStorage = () => localStorage.removeItem(ENVIRONMENTS.STORAGE_KEY)

export const setPlanningStorage = (value: any) =>
	localStorage.setItem(ENVIRONMENTS.PLANNING_STORAGE_KEY, JSON.stringify(value))
export const concurrentPlanningStorage = () =>
	JSON.parse(localStorage.getItem(ENVIRONMENTS.PLANNING_STORAGE_KEY) ?? '[]')
