import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {SessionStorage} from './sessionStorage';
import {SessionStorageService} from '../services/sessionStorage';
import {StorageObserverHelper} from '../helpers/storageObserver';


@Component({
	selector: 'test',
	template: ``
})
class TestComponent {

	@SessionStorage()
	session_key1 = 'default value';

	@SessionStorage('session_key2')
	key;

	@SessionStorage('session_key3', 'default value')
	default_value_key;

}

describe('decorator:sessionStorage', () => {

	let component, sessionS;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent], // declare the test component
			providers: [
				{provide: SessionStorageService, useClass: SessionStorageService},
			]
		});

		let fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		StorageObserverHelper.initStorage();
		sessionS = fixture.debugElement.injector.get(SessionStorageService);
	});

	it('should handle the default value', () => {
		expect(component.default_value_key).toEqual('default value');
	});

	it('should override the default value', () => {
		component.default_value_key = 'another value';
		expect(component.default_value_key).toEqual('another value');
	});


	it('should keep the default value', () => {
		expect(component.session_key1).toEqual('default value');
	});

	it('should update the session_key1 value by the wstorage service', () => {

		let value = 'new value';
		sessionS.store('session_key1', value);
		expect(component.session_key1).toEqual(value);

	});

	it('should update the session_key1 value by the decorator', () => {

		let value = 'new value';
		component.session_key1 = value;
		expect(sessionS.retrieve('session_key1')).toEqual(value);

	});

	it('should update the session_key2 value by the wstorage service', () => {

		let value = 'new value';
		sessionS.store('session_key2', value);
		expect(component.key).toEqual(value);

	});

	it('should update the session_key2 value by the decorator', () => {

		let value = 'new value';
		component.key = value;
		expect(sessionS.retrieve('session_key2')).toEqual(value);

	});

});
