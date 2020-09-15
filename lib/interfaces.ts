export enum API {
	document = "/api/document",
}

export interface UploadDocument {
	byteSize: number;
	date: number;
	filename: string;
}
