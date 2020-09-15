import fetcher from "./fetcher";

let originalFetch: typeof fetch;

beforeEach(() => {
	originalFetch = global.fetch;
});

afterEach(() => {
	global.fetch = originalFetch;
});

test("success", async () => {
	const value = { success: true };
	global.fetch = jest
		.fn()
		.mockResolvedValue({ ok: true, json: () => value, text: () => "error" });
	const response = await fetcher("test");
	expect(response).toBe(value);
});

test("error", async () => {
	global.fetch = jest
		.fn()
		.mockResolvedValue({ ok: false, status: 500, text: () => "error" });
	expect(fetcher("test")).rejects.toEqual("error");
});
