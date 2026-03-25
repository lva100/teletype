import { Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import api from '../libs/axios'

export default function Register() {
	const { setAuth } = useAuth()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [error, setError] = useState('')

	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (password != confirmPassword) {
				setError('Пароли не совпадают')
				return
			}
			const response = await api.post('/auth/register', {
				email,
				password,
				firstName,
				lastName,
			})
			if (response.data.error) {
				setError(response.data.error)
				return
			}
			console.log(response.data)
			setAuth(response.data)
			navigate('/login', { replace: true })
		} catch (err) {
			console.error(err)
			setError('Invalid email or password')
		} finally {
			// setLoading(false)
		}
	}
	return (
		<>
			<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<div className='flex flex-row justify-center'>
						<Mail className='size-10 text-center text-orange-400' />
						<span className='px-1 text-2xl/9 font-bold uppercase tracking-tight bg-linear-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent'>
							Teletype
						</span>
					</div>
					<div className='flex flex-row justify-center'>
						<span className='mt-8 text-xl/10 font-bold tracking-tight bg-linear-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent'>
							Регистрация
						</span>
					</div>
				</div>

				<div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
					{error && <div className='alert alert-danger py-2'>{error}</div>}
					<form onSubmit={handleSubmit} method='POST' className='space-y-6'>
						<div>
							<label
								htmlFor='firstName'
								className='block text-sm/6 font-medium text-gray-500'
							>
								Имя
							</label>
							<div className='mt-2'>
								<input
									id='firstName'
									name='firstName'
									type='text'
									required
									autoComplete='text'
									onChange={e => setFirstName(e.target.value)}
									className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-amber-200 placeholder:text-gray-200 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6'
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor='lastName'
								className='block text-sm/6 font-medium text-gray-500'
							>
								Фамилия
							</label>
							<div className='mt-2'>
								<input
									id='lastName'
									name='lastName'
									type='text'
									required
									autoComplete='text'
									onChange={e => setLastName(e.target.value)}
									className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-amber-200 placeholder:text-gray-200 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6'
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor='email'
								className='block text-sm/6 font-medium text-gray-500'
							>
								Email
							</label>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									type='email'
									required
									autoComplete='email'
									onChange={e => setEmail(e.target.value)}
									className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-amber-200 placeholder:text-gray-200 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm/6 font-medium text-gray-500'
								>
									Пароль
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									required
									autoComplete='current-password'
									onChange={e => setPassword(e.target.value)}
									className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-amber-200 placeholder:text-gray-200 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6'
								/>
							</div>
						</div>
						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='confirmPassword'
									className='block text-sm/6 font-medium text-gray-500'
								>
									Повторить пароль
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									required
									autoComplete='current-password'
									onChange={e => setConfirmPassword(e.target.value)}
									className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-amber-200 placeholder:text-gray-200 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md cursor-pointer bg-linear-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 hover:bg-linear-to-r hover:from-orange-500 hover:to-amber-500'
							>
								Зарегистрироваться
							</button>
						</div>
					</form>
					<p className='mt-10 text-center text-sm/6 text-gray-500'>
						Уже есть аккаунт?{' '}
						<Link
							to='/login'
							className='font-semibold text-orange-400 hover:text-orange-600'
						>
							Войти
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}
