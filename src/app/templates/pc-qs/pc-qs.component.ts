/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component } from '@angular/core';
import { EmitterService } from '@ngxs-labs/emitter';

import { GameState } from '../../states/game.state';
import { GlobalStateInterface } from '../../states/globalstate.interface';

@Component({
    selector: 'app-pc-qs',
    templateUrl: './pc-qs.component.html',
    styleUrls: ['./pc-qs.component.scss'],
})
export class PcQsComponent {

    public constructor(
        private emitter: EmitterService,
    ) { }

    public leavePc(): void {
        this.emitter.action<keyof GlobalStateInterface>(GameState.goToScene).emit('deskQs');
        console.log('meh');
    }
}
