import {Component} from '@angular/core';

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
