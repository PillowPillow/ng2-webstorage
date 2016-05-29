import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {SessionStorageService, SessionStorage, LocalStorage} from '../../index';

@Component({
	selector: 'app-form',
	template: `
		<form [ngFormModel]="form" (submit)="submit($event);">
			<textarea [ngFormControl]="form.controls.text"></textarea>
			<button type="submit">submit</button>
			<button type="button" (click)="clear()">clear</button>
		</form>
		<input type="text" [(ngModel)]="sessionBind">
		<input type="text" [(ngModel)]="localBind">
	`,
})
export class AppForm implements OnInit {

	form:ControlGroup;

	@SessionStorage('variable')
	public sessionBind;
	@LocalStorage('variable')
	public localBind;

	constructor(private fb:FormBuilder, private localS:SessionStorageService) {}

	ngOnInit() {
		this.form = this.fb.group({
			text: this.fb.control(this.localS.retrieve('variable'), Validators.required)
		});
		this.localS.observe('variable')
		.subscribe((data) => console.log(data));
	}

	submit(event) {
		let value = this.form.value;
		this.localS.store('variable', value.text);
	}

	clear() {
		this.localS.clear();
	}

}

@Component({
	selector: 'app-view',
	template: `
		<article>local storage: {{localBind}}</article>
		<article>session storage: {{sessionBind}}</article>
	`
})
class AppView {
	@SessionStorage('variable')
	public sessionBind;
	@LocalStorage('variable')
	public localBind;
}

@Component({
	selector: 'app',
	template: `
		<head>
			<h1>NG2 WEBSTORAGE</h1>
		</head>
		<section>
			<app-form></app-form>
			<app-view></app-view>
		</section>
	`,
	directives: [AppForm, AppView]
})
export class App {
}
