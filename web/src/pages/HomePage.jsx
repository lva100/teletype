import { ArrowRightIcon, Mail } from 'lucide-react'
import { Link } from 'react-router'

function HomePage() {
	return (
		<div className='h-screen bg-base-100 text-base flex'>
			{/* LEFT SIDE */}
			<div className='flex flex-1 flex-col p-8 lg:p-12 relative overflow-hidden'>
				{/* NAVBAR */}
				<nav className='flex items-center justify-between relative z-10'>
					<div className='flex items-center gap-2.5'>
						<div
							className='size-9 rounded-xl bg-linear-to-br from bg-amber-400 to-orange-500
             flex items-center justify-center shadow-lg shadow-gray-500/20
          '
						>
							<Mail className='size-5 text-primary-content' />
						</div>
						<span className='text-xl font-bold'>Teletype</span>
					</div>

					<div className='flex items-center gap-2'>
						{/* <SignInButton mode='modal'> */}
						<Link
							to={'/register'}
							className='px-5 py-2.5 text-sm font-medium text-base-content/50 hover:text-base-content transition border-0'
						>
							Зарегистрироваться
						</Link>
						{/* </SignInButton> */}

						{/* <SignUpButton mode='modal'> */}
						<Link
							to={'/login'}
							className='btn gap-2 bg-linear-to-r from-amber-500 to-orange-500 text-sm font-semibold rounded-full hover:opacity-90 shadow-lg shadow-orange-500/25 border-none'
						>
							Войти
							<ArrowRightIcon className='w-4 h-4' />
						</Link>
						{/* </SignUpButton> */}
					</div>
				</nav>

				{/* MAIN CONTENT */}
				<div className='flex-1 flex flex-col justify-center max-w-xl relative z-10'>
					{/* Tag */}
					<div className='mb-8'>
						<span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider'>
							<span className='w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse' />
							Now Available
						</span>
					</div>

					{/* Headline */}
					<h1 className='text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight font-mono'>
						Messaging for
						<br />
						<span className='bg-linear-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent'>
							everyone
						</span>
					</h1>

					{/* Description */}
					<p className='mt-6 text-lg text-base-content/70 leading-relaxed max-w-md'>
						Secure, blazing-fast conversations with real-time presence and
						instant delivery. Connect with anyone, anywhere.
					</p>

					{/* CTA BTNS */}
					<div className='mt-10 flex items-center gap-4'>
						{/* <SignUpButton mode='modal'> */}
						<Link
							to={'/register'}
							className='group flex items-center gap-3 px-8 py-4 bg-base-100 text-base-content font-semibold rounded-2xl hover:bg-linear-to-r hover:from-amber-300 hover:via-orange-400 hover:to-rose-400 transition'
						>
							Начать общение
							<ArrowRightIcon className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
						</Link>
						{/* </SignUpButton> */}

						{/* <SignInButton mode='modal'> */}
						<Link
							to={'/login'}
							className='px-8 py-4 text-base-content/60 font-semibold hover:text-base-content transition'
						>
							Есть аккаунт
						</Link>
						{/* </SignInButton> */}
					</div>

					{/* STATS */}
					{/* <div className='mt-12 flex items-center gap-10'>
						<div>
							<div className='text-2xl font-bold font-mono'>10K+</div>
							<div className='text-xs text-base-content/60 mt-1 uppercase tracking-wider'>
								Users
							</div>
						</div>
						<div className='w-px h-10 bg-white/10' />
						<div>
							<div className='text-2xl font-bold font-mono'>99.9%</div>
							<div className='text-xs text-base-content/60 mt-1 uppercase tracking-wider'>
								Uptime
							</div>
						</div>
						<div className='w-px h-10 bg-white/10' />
						<div>
							<div className='text-2xl font-bold font-mono'>&lt;50ms</div>
							<div className='text-xs text-base-content/60 mt-1 uppercase tracking-wider'>
								Latency
							</div>
						</div>
					</div> */}
				</div>
			</div>
			{/* RIGHT SIDE */}
			<div className='hidden lg:flex flex-1 relative bg-base-200 items-center justify-center overflow-hidden'>
				{/* Grid Pattern */}
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
						backgroundSize: '50px 50px',
					}}
				/>

				{/* Radial Glow */}
				<div
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
           bg-linear-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-[100px]'
				/>

				{/* Image Container */}
				<div className='relative z-10'>
					{/* Decorative border */}
					<div className='absolute -inset-px rounded-3xl bg-linear-to-b from-white/20 to-white/5 p-px'>
						<div className='w-full h-full rounded-3xl bg-base-200' />
					</div>

					{/* Card */}
					<div className='relative p-6 rounded-3xl border border-base-300 bg-base-200/80 backdrop-blur-xl shadow-2xl'>
						<img
							src='/auth.png'
							alt='Chat illustration'
							className='w-80 xl:w-96 rounded-2xl'
						/>

						{/* Floating elements */}
						<div className='absolute -top-4 -right-4 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium backdrop-blur-sm'>
							● 3 online
						</div>

						<div className='absolute -bottom-4 -left-4 px-4 py-2.5 bg-base-300/40 border border-base-300 rounded-2xl backdrop-blur-sm'>
							<div className='flex items-center gap-2'>
								<div className='flex -space-x-2'>
									<div className='w-6 h-6 rounded-full bg-linear-to-br from-amber-400 to-orange-500' />
									<div className='w-6 h-6 rounded-full bg-linear-to-br from-rose-400 to-pink-500' />
								</div>
								<span className='text-sm text-base-content/80'>typing...</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default HomePage
