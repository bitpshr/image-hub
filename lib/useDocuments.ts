import useSWR from "swr";

import fetcher from "@app/lib/fetcher";
import { API, UploadDocument } from "@app/lib/interfaces";

export interface UseDocumentsValue {
	docs?: UploadDocument[];
	error?: string | number;
	isLoading?: boolean;
}

export default function useDocuments(): UseDocumentsValue {
	const { data, error } = useSWR<UploadDocument[]>(API.document, fetcher);
	return {
		docs: data,
		error: error,
		isLoading: !error && !data,
	};
}
