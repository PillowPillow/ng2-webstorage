import {CompatHelper} from './compat';
import {StorageStub} from '../../stubs/storage.stub';
import {WebStorage} from '../core/interfaces/webStorage';

describe('Helpers : CompatHelper', () => {
	
	let storage: WebStorage;
	
	beforeEach(() => {
		storage = new StorageStub();
	});
	
	it('should determine that the given storage is available', () => {
		expect(CompatHelper.isStorageAvailable(storage)).toBeTruthy();
		expect(CompatHelper.isStorageAvailable(localStorage)).toBeTruthy();
	});
	
	it('should determine that the given storage is not available', () => {
		
		expect(CompatHelper.isStorageAvailable(null)).toBeFalsy();
		
		spyOn(storage, 'setItem').and.throwError('random_error');
		expect(CompatHelper.isStorageAvailable(storage)).toBeFalsy();
		expect(storage.setItem).toHaveBeenCalled();
		
	});
	
});
