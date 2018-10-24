import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LocalStorage, SessionStorage} from '../../../lib';

@Component({
	selector: 'lazy',
	templateUrl: './template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent {
	@SessionStorage('variable', 'default value')
	public sessionBind;
	@LocalStorage('variable')
	public localBind;
}
