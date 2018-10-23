import {Component} from '@angular/core';
import {LocalStorage, SessionStorage} from 'ngx-webstorage';

@Component({
	selector: 'app-view',
	templateUrl: './template.html',
})
export class AppViewComponent {
	@SessionStorage('variable', 'default value')
	public sessionBind;
	@LocalStorage('variable')
	public localBind;
}
