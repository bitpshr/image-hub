import { renderHook } from "@testing-library/react-hooks";

import useDocuments from "./useDocuments";

let originalFetch: typeof fetch;

beforeEach(() => {
	originalFetch = global.fetch;
});

afterEach(() => {
	global.fetch = originalFetch;
});

test("success", async () => {
	global.fetch = jest
		.fn()
		.mockResolvedValue({ ok: true, json: () => [], text: () => "error" });
	const response = renderHook(() => useDocuments());
	await response.waitForNextUpdate();
	expect(response.result.current).toEqual({
		error: undefined,
		isLoading: false,
		docs: [],
	});
});
