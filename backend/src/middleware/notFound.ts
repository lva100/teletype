import type { Request, Response } from 'express'

function notFound(req: Request, res: Response) {
	return res.status(404).json('Route does not exist')
}

export default notFound
