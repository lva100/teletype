import { useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from './useAxiosPrivate'

export const useUsers = () => {
	const api = useAxiosPrivate()
	const { auth } = useAuth()

	return useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const token = auth.accessToken
			const { data } = await api.get('/users', {
				headers: { Authorization: `Bearer ${token}` },
			})
			return data
		},
	})
}
