import './vendors';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {NG2_WEBSTORAGE, KeyStorageHelper} from '../index.js';
import {App} from './components/app';

//KeyStorageHelper.setStorageKeyPrefix('foobar');

bootstrap(App, [NG2_WEBSTORAGE]);
