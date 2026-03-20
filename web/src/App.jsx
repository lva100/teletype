import { Route, Routes } from 'react-router'
import './App.css'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

function App() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/chat' element={<ChatPage />} />
		</Routes>
	)
}

export default App
