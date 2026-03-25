import { useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'
import api from '../libs/axios'

export const useUsers = () => {
	const { auth } = useAuth()

	return useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const token = auth.accessToken
			const res = await api.get('/users', {
				headers: { Authorization: `Bearer ${token}` },
			})
			return res.data
		},
	})
}
