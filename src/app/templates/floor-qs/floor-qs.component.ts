/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmitterService } from '@ngxs-labs/emitter';
import * as PIXI from 'pixi.js';

import { createArrow, createPixiApp } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import { GameState } from '../../states/game.state';
import { GlobalStateInterface } from '../../states/globalstate.interface';

@Component({
    selector: 'app-floor-qs',
    templateUrl: './floor-qs.component.html',
    styleUrls: ['./floor-qs.component.scss'],
})
export class FloorQsComponent {

    public constructor(
        private emitter: EmitterService,
        private scenceService: SceneService,
    ) { }

    public goToQsDesk(): void {
        this.emitter.action<keyof GlobalStateInterface>(GameState.goToScene).emit('deskQs');
    }

    /**
     * setup
     */
    public setup(): void {
        const goToQSDesk = createArrow({
            tipX: 1700,
            tipY: 400,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 20,
        });

        goToQSDesk.onmouseup = (event: PIXI.FederatedPointerEvent): void => {
            this.goToQsDesk();
        };

        this.scenceService.pixiApp?.stage.addChild(goToQSDesk);

    }
}
