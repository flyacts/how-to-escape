/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component } from '@angular/core';
import { EmitterService } from '@ngxs-labs/emitter';
import * as PIXI from 'pixi.js';

import { createArrow } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import { GameState } from '../../states/game.state';
import { GlobalStateInterface } from '../../states/globalstate.interface';

@Component({
    selector: 'app-floor-ac',
    templateUrl: './floor-ac.component.html',
    styleUrls: ['./floor-ac.component.scss'],
})
export class FloorAcComponent {

    public constructor(
        private emitter: EmitterService,
        private scenceService: SceneService,
    ) { }

    public goToQsFloor(): void {
        this.emitter.action<keyof GlobalStateInterface>(GameState.goToScene).emit('floorQs');
    }

    /**
     * setup
     */
    public setup(): void {
        const goToQSDesk = createArrow({
            tipX: 750,
            tipY: 1250,
            color: 0x212121,
            direction: 'bottom',
            size: 100,
            angle: -15,
        });

        goToQSDesk.onmouseup = (): void => {
            this.goToQsFloor();
        };

        this.scenceService.pixiApp?.stage.addChild(goToQSDesk);
    }
}
