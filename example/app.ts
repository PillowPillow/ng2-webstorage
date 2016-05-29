import './vendors';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {NG2_WEBSTORAGES} from '../src/app';
import {App} from './components/app';

bootstrap(App, [NG2_WEBSTORAGES]);
