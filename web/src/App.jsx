import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Login from './components/Login'
import PageLoader from './components/PageLoader'
import Register from './components/Register'
// import useAuth from './hooks/useAuth'
import { useCurrentUser } from './hooks/useCurrentUser'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

function App() {
	// const { auth } = useAuth()
	const { data: currentUser } = useCurrentUser()
	// const auth = true
	const isLoaded = true
	const isSignedIn = currentUser ? true : false
	// console.log(auth)

	if (!isLoaded) return <PageLoader />
	return (
		<Routes>
			<Route
				path='/'
				element={!isSignedIn ? <HomePage /> : <Navigate to={'/chat'} />}
			/>
			<Route
				path='/chat'
				element={isSignedIn ? <ChatPage /> : <Navigate to={'/'} />}
			/>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	)
}

export default App
