import {STORAGE} from '../enums/storage';
import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';

export class StorageObserverHelper {

	static observers:Object = {};
	static storageInitStream:EventEmitter<boolean> = new EventEmitter();
	static storageInit$:Observable<boolean> = StorageObserverHelper.storageInitStream.asObservable();

	static observe(sType:STORAGE, sKey:string):EventEmitter<any> {
		let oKey = this.genObserverKey(sType, sKey);
		if(oKey in this.observers)
			return this.observers[oKey];
		return this.observers[oKey] = new EventEmitter();
	}

	static emit(sType:STORAGE, sKey:string, value:any):void {
		let oKey = this.genObserverKey(sType, sKey);
		if(oKey in this.observers) this.observers[oKey].emit(value);
	}

	static genObserverKey(sType:STORAGE, sKey:string):string {
		return sType + '|' + sKey;
	}

	static initStorage() {
		StorageObserverHelper.storageInitStream.emit(true);
	}

}
