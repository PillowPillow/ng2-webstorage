import {STORAGE} from '../enums/storage';
import {EventEmitter} from '@angular/core';

export class StorageObserverHelper {

	static observers:Object = {};

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
		return `${sType}|${sKey}`;
	}

}
