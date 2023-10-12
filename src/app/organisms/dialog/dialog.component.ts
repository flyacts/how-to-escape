/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

    @Input()
    public title!: string;

    @Input({ required: true })
    public options!: string[];

    // emits the index of the chosen option
    @Output()
    public onOptionClick = new EventEmitter<number>();
}
