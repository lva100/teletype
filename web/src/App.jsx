import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Login from './components/Login'
import PageLoader from './components/PageLoader'
import Register from './components/Register'
import useAuth from './hooks/useAuth'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

function App() {
	const { auth } = useAuth()
	// const auth = true
	const isLoaded = true
	// const isSignedIn = false
	// console.log(auth)

	if (!isLoaded) return <PageLoader />
	return (
		<Routes>
			<Route
				path='/'
				element={!auth ? <HomePage /> : <Navigate to={'/chat'} />}
			/>
			<Route
				path='/chat'
				element={auth ? <ChatPage /> : <Navigate to={'/'} />}
			/>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	)
}

export default App
