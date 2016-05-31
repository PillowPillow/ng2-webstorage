import './vendors';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {NG2_WEBSTORAGE} from '../index.js';
import {App} from './components/app';

bootstrap(App, [NG2_WEBSTORAGE]);
