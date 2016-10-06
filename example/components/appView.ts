import {Component} from '@angular/core';
import {SessionStorage, LocalStorage} from '../libwrapper';

@Component({
	selector: 'app-view',
	template: `
		<article>local storage: {{localBind}}</article>
		<article>session storage: {{sessionBind}}</article>
	`
})
export class AppView {
	@SessionStorage('variable')
	public sessionBind;
	@LocalStorage('variable')
	public localBind;
}
