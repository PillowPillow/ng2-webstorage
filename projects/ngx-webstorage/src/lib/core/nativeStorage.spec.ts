import {inject, TestBed} from '@angular/core/testing';
import {LOCAL_STORAGE, LocalStorageProvider, SESSION_STORAGE, SessionStorageProvider} from './nativeStorage';

describe('Core : NativeStorage', () => {
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LocalStorageProvider,
				SessionStorageProvider
			]
		});
	});
	
	it('should provide the localStorage', inject(
		[LOCAL_STORAGE],
		(storage: Storage) => {
			expect(storage).toEqual(localStorage);
		})
	);
	
	it('should provide the sessionStorage', inject(
		[SESSION_STORAGE],
		(storage: Storage) => {
			expect(storage).toEqual(sessionStorage);
		})
	);
	
});

