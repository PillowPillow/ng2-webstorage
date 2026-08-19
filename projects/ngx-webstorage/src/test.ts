// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js';
import 'zone.js/testing';
import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
);

// The library's strategy registry is static (StrategyIndex.index) and
// register() never overrides an existing entry, so a strategy left behind by
// one spec is silently reused by the next. With jasmine's randomised order that
// makes the suite order-dependent: measured 4 failures in 30 runs before this
// reset. Clearing between specs makes every spec start from an empty registry.
import {StrategyIndex} from './lib/services/strategyIndex';

beforeEach(() => StrategyIndex.clear());
