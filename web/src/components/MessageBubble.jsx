import { formatTime } from '../libs/utils'

export function MessageBubble({ message, currentUser }) {
	console.log(message, currentUser)
	const isMe = message.sender?.id === currentUser?.id

	return (
		<div className={`flex px-90 ${isMe ? 'justify-end' : 'justify-start'}`}>
			<div
				className={`max-w-md px-4 py-2.5 rounded-2xl ${
					isMe
						? 'bg-linear-to-r from-amber-500 to-orange-500 text-primary-content'
						: 'bg-base-300/40 text-base-content'
				}`}
			>
				<p className='text-sm'>{message.text}</p>
				<p
					className={`text-xs mt-1 ${isMe ? 'text-primary-content/80' : 'text-base-content/70'}`}
				>
					{formatTime(message.createdAt)}
				</p>
			</div>
		</div>
	)
}
