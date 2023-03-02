/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmitterService } from '@ngxs-labs/emitter';
import * as PIXI from 'pixi.js';

import { createArrow, createPixiApp } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import { GameState } from '../../states/game.state';
import { GlobalStateInterface } from '../../states/globalstate.interface';

@Component({
    selector: 'app-desk-qs',
    templateUrl: './desk-qs.component.html',
    styleUrls: ['./desk-qs.component.scss'],
})
export class DeskQsComponent implements OnInit {

    public constructor(
        private emitter: EmitterService,
        private sceneService: SceneService,
    ) { }

    public ngOnInit(): void {
        const leaveDesk = createArrow({
            tipX: 100,
            tipY: 850,
            color: 0x212121,
            direction: 'left',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.leaveDesk();
        };

        this.sceneService.pixiApp?.stage.addChild(leaveDesk);
    }

    public leaveDesk(): void {
        this.emitter.action<keyof GlobalStateInterface>(GameState.goToScene).emit('floorQs');
    }
}
