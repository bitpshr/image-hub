import { existsSync, mkdirSync, promises } from "fs";
import { tmpdir } from "os";
import { join } from "path";

import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

import { withErrorHandling } from "@app/lib/withErrorHandling";

export const UPLOAD_DIR = join(tmpdir(), "image-hub-uploads");
if (!existsSync(UPLOAD_DIR)) {
	mkdirSync(UPLOAD_DIR);
}
const ALLOWED_EXTENSIONS = ["image/jpeg", "image/png"];
const ALLOWED_SIZE = 10 * 1024 * 1024;

function createDocument(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const form = new formidable.IncomingForm();
	form.hash = "sha256";
	form.keepExtensions = true;
	form.maxFileSize = ALLOWED_SIZE;
	form.multiples = true;
	form.uploadDir = UPLOAD_DIR;

	return new Promise((resolve) => {
		form.parse(req, async (err, fields, files) => {
			const file = Object.values(files)[0];
			if (file.hash !== fields.hash) {
				await promises.unlink(file.path);
				return res.status(400).send("Corrupted file content");
			}

			if (!ALLOWED_EXTENSIONS.includes(file.type)) {
				await promises.unlink(file.path);
				return res.status(415).send("Unsupported file type");
			}

			if (err) {
				return res.status(500).send(err);
			}

			await promises.rename(file.path, join(UPLOAD_DIR, file.name));

			res.status(200).send({ success: true });
			resolve();
		});
	});
}

async function getDocuments(
	_: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const filenames = await promises.readdir(UPLOAD_DIR);
	const files = await Promise.all(
		filenames.map(async (filename) => {
			try {
				const { size, mtimeMs } = await promises.stat(
					join(UPLOAD_DIR, filename)
				);
				return { byteSize: size, date: mtimeMs, filename };
			} catch (_) {}
		})
	);
	res.status(200).send(files);
}

export const config = {
	api: {
		bodyParser: false,
	},
};

function documentIndex(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "POST":
			return createDocument(req, res);
		case "GET":
			return getDocuments(req, res);
		default:
			return res.status(404).end();
	}
}

export default withErrorHandling(documentIndex);
