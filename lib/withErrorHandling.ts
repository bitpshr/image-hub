import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function withErrorHandling(nextHandler: NextApiHandler): NextApiHandler {
	return (req: NextApiRequest, res: NextApiResponse) => {
		try {
			return nextHandler(req, res);
		} catch (error) {
			res.status(error.status || 500).end(error.message);
		}
	};
}
