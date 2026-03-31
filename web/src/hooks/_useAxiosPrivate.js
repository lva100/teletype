import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL + '/api',
	withCredentials: true,
})

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		// Флаг, чтобы избежать бесконечного цикла при ошибке обновления токена
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				// Получаем новый access token через refresh token
				const { refreshToken } = localStorage.getItem('user')
				const tokenResponse = await api.post('/refresh-token', { refreshToken })
				const newAccessToken = tokenResponse.data.accessToken

				// Сохраняем новый токен
				localStorage.setItem('authToken', newAccessToken)

				// Обновляем заголовок Authorization в оригинальном запросе
				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

				// Повторяем оригинальный запрос с новым токеном
				return api(originalRequest)
			} catch (refreshError) {
				console.error('Не удалось обновить токен:', refreshError)
				// Если обновление токена не удалось — выходим
				localStorage.removeItem('authToken')
				localStorage.removeItem('refreshToken')
				window.location.href = '/login'
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	},
)

export default api
