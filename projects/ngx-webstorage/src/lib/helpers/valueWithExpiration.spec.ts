import {ValueWithExpiration} from './valueWithExpiration';
import {CompatHelper} from './compat';

describe('Helpers : ValueWithExpiration', () => {
	
	it('simple value', () => {
		const valueWithExpiration = new ValueWithExpiration(10);
		valueWithExpiration.setExpiration(10);
		expect(valueWithExpiration.isExpired()).toBeFalsy();
		valueWithExpiration.setExpiration(-10);
		expect(valueWithExpiration.isExpired()).toBeTruthy();
		expect(valueWithExpiration.getRealValue()).toMatch('10');
		expect(valueWithExpiration.getValueForStorage()._v).toMatch('10');
	});

	it('value already with set expiration but not expired', () => {
		const valueWithExpiration = new ValueWithExpiration({_v: 10, _e_in: CompatHelper.getUTCTime() + 10});
		expect(valueWithExpiration.isExpired()).toBeFalsy();
		valueWithExpiration.setExpiration(-10);
		expect(valueWithExpiration.isExpired()).toBeTruthy();
		expect(valueWithExpiration.getRealValue()).toEqual(10);
		expect(valueWithExpiration.getValueForStorage()._v).toEqual(10);
	});

	it('value already with set expiration and expired', () => {
		const valueWithExpiration = new ValueWithExpiration({_v: 10, _e_in: CompatHelper.getUTCTime() - 10});
		expect(valueWithExpiration.isExpired()).toBeTruthy();
		valueWithExpiration.setExpiration(20);
		expect(valueWithExpiration.isExpired()).toBeFalsy();
		expect(valueWithExpiration.getRealValue()).toEqual(10);
		expect(valueWithExpiration.getValueForStorage()._v).toEqual(10);
	});

});
