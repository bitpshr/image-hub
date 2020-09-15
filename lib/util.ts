const formatter = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

export function formatBytes(value: number): string {
	return `${formatter.format(value * 0.001)}Kb`;
}
