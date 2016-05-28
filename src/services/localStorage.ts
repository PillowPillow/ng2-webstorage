import {Injectable} from '@angular/core';
import {IStorage} from '../interfaces';
import {STORAGE} from '../enums/storage';
import {WebStorage} from './webStorage';

@Injectable()
export class LocalStorageService extends WebStorage implements IStorage {
	constructor() {
		super(STORAGE.local);
	}
}