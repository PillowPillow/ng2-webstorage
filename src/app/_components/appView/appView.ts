import {Component} from '@angular/core';
import {LocalStorage, SessionStorage} from '../../lib';

@Component({
    selector: 'app-view',
    templateUrl: './template.html',
    standalone: false
})
export class AppViewComponent {
	@SessionStorage('variable', 'default value')
	public sessionBind;
	@LocalStorage('variable')
	public localBind;
	@LocalStorage('object')
	public objectLocalBind;
}
