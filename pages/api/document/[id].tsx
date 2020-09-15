import { promises } from "fs";
import { join } from "path";

import { NextApiRequest, NextApiResponse } from "next";

import { withErrorHandling } from "@app/lib/withErrorHandling";

import { UPLOAD_DIR } from ".";

async function deleteDocument(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	await promises.unlink(join(UPLOAD_DIR, `${req.query.id}`));
	res.status(204).send({ success: true });
}

function document(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "DELETE":
			return deleteDocument(req, res);
		default:
			return res.status(404).end();
	}
}

export default withErrorHandling(document);
