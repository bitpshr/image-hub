export default async function fetcher<T = any>(
	url: string,
	init?: RequestInit
): Promise<T> {
	const response = await fetch(url, init);
	if (!response.ok) {
		const errorText = (await response.text()) || "An error has occurred.";
		throw errorText;
	}
	return (!init || init.method !== "DELETE") && response.json();
}
