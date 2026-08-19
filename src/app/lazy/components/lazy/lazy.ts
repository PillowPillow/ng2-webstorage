import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LocalStorage, SessionStorage} from '../../../lib';

@Component({
    selector: 'lazy',
    templateUrl: './lazy.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LazyComponent {
	@SessionStorage('variable', 'default value')
	public sessionBind!: any;
	@LocalStorage('variable')
	public localBind!: any;

	public setLocalBind(event: Event) {
		const target = event.target as HTMLInputElement;
		this.localBind = target.value
	}
	public setSessionBind(event: Event) {
		const target = event.target as HTMLInputElement;
		this.sessionBind = target.value
	}
}