import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [],
	providers: [],
})
export class SharedModule {
}
