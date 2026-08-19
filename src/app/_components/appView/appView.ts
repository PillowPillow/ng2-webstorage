import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LocalStorage, SessionStorage} from '../../lib';

@Component({
    selector: 'app-view',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppViewComponent {
	@SessionStorage('variable', 'default value')
	public sessionBind!: any;
	@LocalStorage('variable')
	public localBind!: any;
	@LocalStorage('object')
	public objectLocalBind!: any;
}
