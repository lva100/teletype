import { useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'
import api from '../libs/axios'

export const useMessages = chatId => {
	const { auth } = useAuth()

	return useQuery({
		queryKey: ['messages', chatId],
		queryFn: async () => {
			const token = auth.accessToken
			const res = await api.get(`/messages/chat/${chatId}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			return res.data
		},
		enabled: !!chatId,
	})
}
