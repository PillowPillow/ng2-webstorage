import {EventEmitter} from '@angular/core';

import {StorageObserverHelper} from './storageObserver';
import {LIB_KEY} from '../constants/lib';
import {STORAGE} from '../enums/storage';

describe('helper:storageObserver', () => {

	describe('observe', () => {

		let event = StorageObserverHelper.observe(STORAGE.local, 'storageObserver:key');

		it('should return an EventEmitter instance', () => {

			expect(event instanceof EventEmitter).toBe(true);

		});

		it('should return the same EventEmitter instance', () => {

			expect(StorageObserverHelper.observe(STORAGE.local, 'storageObserver:key') === event).toBe(true);

		});

		it('should return an other EventEmitter instance', () => {

			expect(StorageObserverHelper.observe(STORAGE.local, 'storageObserver:key2') !== event).toBe(true);

		});

	});


	describe('emit', () => {

		let event = StorageObserverHelper.observe(STORAGE.local, 'storageObserver:key');

		it('should emit an event to the subscribers', (done) => {

			let result = 'emitted';

			let sub = event.subscribe((data) => {
				expect(data).toEqual(result);
				done();
			});

			event.emit('emitted');
		});

	});

	describe('genObserverKey', () => {

		it('should return a storage key', () => {

			let sKey = 'key';
			expect(StorageObserverHelper.genObserverKey(STORAGE.local, sKey)).toEqual(`${STORAGE.local}|${sKey}`);

		});

	});

});
