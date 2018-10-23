import {Component} from '@angular/core';
import {LocalStorage, LocalStorageService} from '../../../../dist/ngx-webstorage';

@Component({
	selector: 'root',
	templateUrl: './template.html',
	styleUrls: ['./style.scss']
})
export class RootComponent {
	
	@LocalStorage('Text', 'default') text: string;
	@LocalStorage('hello world') hello: string;
	
	constructor(protected storage: LocalStorageService) {
		this.storage.observe('hello world').subscribe((data) => console.log('=>', data));
		this.storage.store('hello world', 123);
		this.storage.store('hello world', 123);
		const arr = [];
		this.storage.store('hello world', arr);
		this.storage.store('hello world', arr);
		arr.push(1);
		this.storage.store('hello world', arr);
		const val = this.storage.retrieve('hello world');
		console.log(val);
	}
	
	randomizeHello() {
		this.storage.store('hello world', Math.random() * 123 | 0);
	}
}
