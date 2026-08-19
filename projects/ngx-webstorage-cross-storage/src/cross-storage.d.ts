/**
 * The `cross-storage` package ships no type declarations. Under `strict` the
 * untyped import is an error (TS7016), so declare the one export this library
 * consumes rather than turning `noImplicitAny` off for the whole project.
 */
declare module 'cross-storage' {
	export class CrossStorageClient {
		constructor(url: string, options?: {timeout?: number; frameId?: string});

		onConnect(): Promise<void>;

		set(key: string, value: string): Promise<void>;

		get(key: string): Promise<string>;

		del(...keys: string[]): Promise<void>;

		clear(): Promise<void>;

		getKeys(): Promise<string[]>;

		close(): void;
	}
}
