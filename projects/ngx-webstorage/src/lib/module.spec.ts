import {inject, TestBed} from '@angular/core/testing';
import {NgxWebstorageModule} from './module';
import {StrategyIndex} from './services/strategyIndex';

describe('Module', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NgxWebstorageModule.forRoot()
			]
		});
	});

	it('should index the storage strategies', inject([], () => {
		expect(StrategyIndex.hasRegistredStrategies()).toBeTruthy();
	}));

});

