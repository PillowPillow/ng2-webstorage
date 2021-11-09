import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LocalStorage, SessionStorage} from '../../../lib';

@Component({
	selector: 'lazy',
	templateUrl: './lazy.html',
	//changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent {
	@SessionStorage('variable', 'default value')
	public sessionBind;
	@LocalStorage('variable')
	public localBind;

	public setLocalBind(event) {
		const target = event.target as HTMLInputElement;
		this.localBind = target.value
	}
	public setSessionBind(event) {
		const target = event.target as HTMLInputElement;
		this.sessionBind = target.value
	}
}