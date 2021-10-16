import {CompatHelper} from './compat';

export class ValueWithExpiration {
	public _d: any;
	constructor(public v: any) {
		if (v._e_in) {
			this._d = v;
		} else {
			this._d = {'_v': v};
		}
	}

	setExpiration(expiresIn: number): void {
		this._d._e_in = CompatHelper.getUTCTime() + expiresIn;
	}

	isExpired(): boolean {
		return this._d._e_in < CompatHelper.getUTCTime();
	}

	getValueForStorage(): any {
		return this._d;
	}

	getRealValue(): any {
		return this._d._v;
	}

}
