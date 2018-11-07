import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorage, LocalStorageService, SessionStorage, SessionStorageService} from '../../lib';

@Component({
	selector: 'app-form',
	templateUrl: './template.html'
})
export class AppFormComponent implements OnInit {

	form: FormGroup;

	@SessionStorage('variable')
	public sessionBind;
	@LocalStorage('variable', 'default value')
	public localBind;

	constructor(private fb: FormBuilder, private sessionS: SessionStorageService, private localS: LocalStorageService) {}

	ngOnInit() {
		this.form = this.fb.group({
			text: this.fb.control(this.sessionS.retrieve('variable'), Validators.required)
		});
		this.sessionS.observe('variable')
			.subscribe((data) => console.log('session variable changed : ', data));
		this.localS.observe('variable')
			.subscribe((data) => console.log('local variable changed : ', data));
	}

	submit(value, valid) {
		this.sessionS.store('variable', value.text);
	}

	clear() {
		this.sessionS.clear();
	}

}