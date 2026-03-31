import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'
import axiosPrivate from './_useAxiosPrivate'

export const useChats = () => {
	const { auth } = useAuth()

	return useQuery({
		queryKey: ['chats'],
		queryFn: async () => {
			const token = auth.accessToken
			const res = await axiosPrivate.get('/chats', {
				headers: { Authorization: `Bearer ${token}` },
			})
			return res.data
		},
	})
}

export const useGetOrCreateChat = () => {
	const { auth } = useAuth()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async particiantId => {
			const token = auth.accessToken
			const res = await axiosPrivate.post(
				`/chats/with/${particiantId}`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } },
			)
			return res.data
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chats'] }),
	})
}
