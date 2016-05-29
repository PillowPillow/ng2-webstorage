import {EventEmitter} from '@angular/core';
import {STORAGE} from '../enums/storage';

export interface IStorage {
	store(key:string, value:string):void;
	retrieve(key:string):string;
	clear(key?:string):void;
	observe(key:string): EventEmitter;
}
