import { SearchIcon, UsersIcon } from 'lucide-react'
import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useSocketStore } from '../libs/socket'

export function NewChatModal({ onStartChat, isPending, isOpen, onClose }) {
	const [searchQuery, setSearchQuery] = useState('')
	const { onlineUsers } = useSocketStore()
	const { data: allUsers = [] } = useUsers()
	const isOnline = id => onlineUsers.has(id)

	const handleStartChat = participantId => {
		onStartChat(participantId)
		setSearchQuery('')
		onClose()
	}

	const searchResults = allUsers.filter(u => {
		if (!searchQuery.trim()) return false
		const query = searchQuery.toLowerCase()
		return (
			u.name?.toLowerCase().includes(query) ||
			u.email?.toLowerCase().includes(query)
		)
	})

	return (
		<dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
			<div className='modal-box'>
				<h3 className='font-semibold flex items-center gap-2 mb-4'>
					<UsersIcon className='size-5 text-primary' />
					Новый чат
				</h3>
				<div className='relative mb-4'>
					<SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/60 z-10 pointer-events-none' />
					<input
						type='text'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder='Поиск пользователя по имени или email...'
						className='input input-bordered w-full pl-10'
						autoFocus
					/>
				</div>
				<div className='max-h-72 overflow-y-auto'>
					{searchResults.length === 0 ? (
						<div className='py-8 text-center text-base-content/60 text-sm'>
							{searchQuery
								? 'Пользователь не найден'
								: 'Начните писать для поиска'}
						</div>
					) : (
						<div className='space-y-2'>
							{searchResults.map(u => (
								<button
									key={u.id}
									onClick={() => handleStartChat(u.id)}
									disabled={isPending}
									className='btn btn-ghost justify-start gap-3 w-full normal-case'
								>
									<div className='relative'>
										<img
											src={import.meta.env.VITE_API_URL + u.avatarUrl}
											className='w-10 h-10 rounded-full'
										/>
										{isOnline(u._id) && (
											<span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-base-200' />
										)}
									</div>
									<div className='text-left'>
										<p className='font-medium text-sm'>{u.name}</p>
										<p className='text-xs text-base-content/70'>{u.email}</p>
									</div>
								</button>
							))}
						</div>
					)}
				</div>
				<div className='modal-action'>
					<form method='dialog'>
						<button
							className='btn'
							onClick={() => {
								setSearchQuery('')
								onClose()
							}}
						>
							Close
						</button>
					</form>
				</div>
			</div>
			<form method='dialog' className='modal-backdrop' onClick={onClose}>
				<button>close</button>
			</form>
		</dialog>
	)
}
