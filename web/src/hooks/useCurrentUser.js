import { useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'
import api from '../libs/axios'

export const useCurrentUser = () => {
	const { auth } = useAuth()

	return useQuery({
		queryKey: ['currentUser'],
		queryFn: async () => {
			const token = auth.accessToken
			const { data } = await api.get('/auth/me', {
				headers: { Authorization: `Bearer ${token}` },
			})
			return data
		},
	})
}
