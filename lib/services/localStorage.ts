import {Injectable} from '@angular/core';
import {IStorage} from '../interfaces';
import {STORAGE} from '../enums/storage';
import {WebStorageService} from './webStorage';

@Injectable()
export class LocalStorageService extends WebStorageService implements IStorage {
	constructor() {
		super(STORAGE.local);
	}
}
