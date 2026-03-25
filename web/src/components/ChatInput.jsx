import { SendIcon } from 'lucide-react'

export function ChatInput({ value, onChange, onSubmit, disabled }) {
	return (
		<form onSubmit={onSubmit} className='p-4 border-t border-base-300'>
			<div className='flex items-center gap-3'>
				<input
					type='text'
					value={value}
					onChange={onChange}
					placeholder='Сообщение'
					className='input input-bordered flex-1 rounded-xl bg-base-300/40 border-base-300 placeholder:text-base-content/60 focus:outline-amber-500'
				/>
				<button
					type='submit'
					disabled={disabled}
					className='btn rounded-xl bg-linear-to-r from-amber-500 to-orange-500 border-none disabled:btn-disabled'
				>
					<SendIcon className='size-5' />
				</button>
			</div>
		</form>
	)
}
