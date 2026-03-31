export function formatTime(date) {
	if (!date) return ''
	const d = new Date(date)
	const now = new Date()
	const diff = now - d

	if (diff < 60000) return 'сейчас'
	if (diff < 3600000) return `${Math.floor(diff / 60000)} мин. назад`
	if (diff < 86400000)
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	if (diff < 604800000) return d.toLocaleDateString([], { weekday: 'short' })
	return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}
