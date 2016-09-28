import {Component, OnInit} from '@angular/core';
import {SessionStorageService, SessionStorage, LocalStorage} from '../../lib/app';

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
