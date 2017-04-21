import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SessionStorageService, SessionStorage, LocalStorage} from '../../../libwrapper';

@Component({
	selector: 'app-form',
	template: `
		<form [formGroup]="form" novalidate (submit)="submit(form.value, form.valid);">
			<textarea formControlName="text"></textarea>
			<button type="submit">submit</button>
			<button type="button" (click)="clear()">clear</button>
		</form>
		<input type="text" [(ngModel)]="sessionBind">
		<input type="text" [(ngModel)]="localBind">
	`,
})
export class AppForm implements OnInit {

	form: FormGroup;

	@SessionStorage('variable')
	public sessionBind;
	@LocalStorage('variable', 'default value')
	public localBind;

	constructor(private fb: FormBuilder, private sessionS: SessionStorageService) {}

	ngOnInit() {
		this.form = this.fb.group({
			text: this.fb.control(this.sessionS.retrieve('variable'), Validators.required)
		});
		this.sessionS.observe('variable')
		.subscribe((data) => console.log('data: ', data));
	}

	submit(value, valid) {
		this.sessionS.store('variable', value.text);
	}

	clear() {
		this.sessionS.clear();
	}

}

