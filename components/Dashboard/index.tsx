import { FunctionComponent, memo, useCallback, useMemo, useState } from "react";
import { mutate } from "swr";

import Document from "@app/components/Document";
import Flex from "@app/components/Flex";
import SearchBar from "@app/components/SearchBar";
import fetcher from "@app/lib/fetcher";
import { API } from "@app/lib/interfaces";
import useDocuments from "@app/lib/useDocuments";
import useMedia from "@app/lib/useMedia";
import { formatBytes } from "@app/lib/util";

import css from "./index.module.css";

function hashFile(file: Blob): Promise<string> {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = async (event) => {
			if (!event.target) return;
			const bytes = new Uint8Array(event.target.result as ArrayBuffer);
			const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
			const hashBytes = new Uint8Array(hashBuffer);
			const hash = Array.from(hashBytes)
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("");
			resolve(hash);
		};
		reader.readAsArrayBuffer(file);
	});
}

const Dashboard: FunctionComponent = memo(() => {
	const { docs, isLoading, error: docError } = useDocuments();
	const [search, setSearch] = useState("");
	const [error, setError] = useState(docError);
	const size = useMedia();
	const filteredDocs = useMemo(
		() =>
			docs
				? docs.filter(
						(doc) => doc && doc.filename.toLowerCase().includes(search)
				  )
				: [],
		[docs, search]
	);

	const handleDelete = useCallback((id: string) => {
		const shouldDelete = window.confirm("Are you sure?");
		if (!shouldDelete) return;
		try {
			fetcher(`${API.document}/${id}`, { method: "DELETE" });
			mutate(API.document);
		} catch (error) {
			setError(error);
		}
	}, []);

	const handleSearch = useCallback((event) => {
		setSearch(event.target.value.trim().toLocaleLowerCase());
	}, []);

	const handleUpload = useCallback(async (event) => {
		try {
			const file = event.target.files[0];
			const formData = new FormData();
			formData.append("file", file);
			formData.append("hash", await hashFile(file));
			await fetcher("/api/document", {
				body: formData,
				method: "POST",
			});
			mutate(API.document);
		} catch (error) {
			setError(error);
		}
	}, []);

	return (
		<div className={css.dashboard}>
			<SearchBar onUpload={handleUpload} onChange={handleSearch} />
			{error && <div className={css.error}>{error}</div>}
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<Flex alignItems="stretch" direction="column">
					<Flex
						alignItems={size.large ? "flex-end" : "stretch"}
						direction={size.large ? "row" : "column"}
					>
						<Flex grow={1}>
							<h1 className={css.count}>{filteredDocs.length} documents</h1>
						</Flex>
						<Flex className={css.size}>
							Total size:{" "}
							{formatBytes(
								filteredDocs.reduce((prev, curr) => curr.byteSize + prev, 0)
							)}
						</Flex>
					</Flex>
					<Flex grow={1} wrap="wrap">
						{filteredDocs.map((doc) => (
							<Document
								key={doc.filename}
								{...doc}
								onDelete={() => handleDelete(doc.filename)}
							/>
						))}
					</Flex>
				</Flex>
			)}
		</div>
	);
});

export default Dashboard;
