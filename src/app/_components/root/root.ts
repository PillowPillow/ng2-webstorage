import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'root',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RootComponent {

}
