import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LocalStorage, SessionStorage} from '../../../lib';

@Component({
	selector: 'eager',
	templateUrl: './template.html',
	//changeDetection: ChangeDetectionStrategy.OnPush
})
export class EagerComponent {
	@SessionStorage('variable', 'default value')
	public sessionBind;
	@LocalStorage('variable')
	public localBind;
}