import './vendors';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './modules/app/module';
platformBrowserDynamic().bootstrapModule(AppModule);
