import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useSocketStore } from '../libs/socket'

export const useSocketConnection = activeChatId => {
	const { auth } = useAuth()
	const queryClient = useQueryClient()

	const { socket, connect, disconnect, joinChat, leaveChat } = useSocketStore()

	// connect socket on mount
	useEffect(() => {
		if (auth) {
			if (auth.accessToken) connect(auth.accessToken, queryClient)
		} else {
			disconnect()
		}

		return () => {
			disconnect()
		}
	}, [auth, connect, disconnect, queryClient])

	// join/leave chat rooms - if you have a chatid in the url this will run
	useEffect(() => {
		if (activeChatId && socket) {
			joinChat(activeChatId)
			return () => leaveChat(activeChatId)
		}
	}, [activeChatId, socket, joinChat, leaveChat])
}
