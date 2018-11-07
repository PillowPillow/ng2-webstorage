export interface WebStorage {
	readonly length: number;

	clear(): void;

	getItem(key: string): string | null;

	key(index: number): string | null;

	removeItem(key: string): void;

	setItem(key: string, value: string): void;

	[name: string]: any;
}
