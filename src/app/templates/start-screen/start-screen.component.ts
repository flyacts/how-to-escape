/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component } from '@angular/core';

@Component({
    selector: 'app-start-screen',
    templateUrl: './start-screen.component.html',
    styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {

    public startGame(): void {
        console.log('start game!');
    }
}
