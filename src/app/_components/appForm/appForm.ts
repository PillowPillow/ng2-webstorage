import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorage, SessionStorage, SessionStorageService} from '../../lib';

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