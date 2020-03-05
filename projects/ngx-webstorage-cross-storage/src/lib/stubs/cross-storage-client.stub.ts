import {CrossStorageClientI} from '../cross-storage-client';

export class CrossStorageClientStub implements CrossStorageClientI {

	public storage: any = {};

	async onConnect(): Promise<any> {
		return Promise.resolve();
	}

	async set(key: string, value: any): Promise<any> {
		return this.exec(() => this.storage[key] = value);
	}

	async get(key: string): Promise<any> {
		return this.exec(() => this.storage[key] || null);
	}

	async clear(key?: string): Promise<any> {
		return this.exec(() => {
			this.storage = {};
		});
	}

	async del(key?: string): Promise<any> {
		return this.exec(() => {
			if (key) delete this.storage[key];
		});
	}

	protected async exec(fn: Function): Promise<any> {
		return Promise.resolve(fn());
	}

}
