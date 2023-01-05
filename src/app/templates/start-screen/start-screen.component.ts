/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component } from '@angular/core';
import { EmitterService } from '@ngxs-labs/emitter';

import { GameState } from '../../states/game.state';
import { GlobalStateInterface } from '../../states/globalstate.interface';

@Component({
    selector: 'app-start-screen',
    templateUrl: './start-screen.component.html',
    styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {

    public constructor(
        private emitter: EmitterService,
    ) { }

    public startGame(): void {
        this.emitter.action<keyof GlobalStateInterface>(GameState.goToScene).emit('pcQs');
    }
}
