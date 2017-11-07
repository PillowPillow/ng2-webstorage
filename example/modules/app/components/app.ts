import {Component} from '@angular/core';
import {WebStorageConfig} from '../../../libwrapper';

@WebStorageConfig({
	separator: '.',
	prefix: 'foobar',
	caseSensitive: true
})

@Component({
	selector: 'app',
	template: `
		<header>
			<h1>NG2 WEBSTORAGE</h1>
		</header>
		<section>
			<app-view></app-view>
			<app-form></app-form>
		</section>
	`
})
export class App {
}
