import {WebStorage} from '../lib/core/interfaces/webStorage';

export class StorageStub implements WebStorage {
	[name: string]: any;

	public store: { [prop: string]: any } = {};

	get length(): number {
		return Object.keys(this.store).length;
	}

	clear(): void {
		this.store = {};
	}

	getItem(key: string): string | null {
		return this.store[key] || null;
	}

	key(index: number): string | null {
		return Object.keys(this.store)[index];
	}

	removeItem(key: string): void {
		delete this.store[key];
	}

	setItem(key: string, value: string): void {
		this.store[key] = value;
	}

}
