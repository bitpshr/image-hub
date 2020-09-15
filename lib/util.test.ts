import { formatBytes } from "./util";

test("formatBytes", () => {
	expect(formatBytes(1000)).toBe("1Kb");
});
