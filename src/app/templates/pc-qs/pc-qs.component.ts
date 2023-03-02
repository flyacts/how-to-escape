/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmitterService } from '@ngxs-labs/emitter';
import * as PIXI from 'pixi.js';

import { createPixiApp } from '../../helpers';
import { GameState } from '../../states/game.state';
import { GlobalStateInterface } from '../../states/globalstate.interface';

@Component({
    selector: 'app-pc-qs',
    templateUrl: './pc-qs.component.html',
    styleUrls: ['./pc-qs.component.scss'],
})
export class PcQsComponent {

    @ViewChild('canvas', { static: true })
    public canvas!: ElementRef<HTMLCanvasElement>;

    private pixiApp!: PIXI.Application;

    public constructor(
        private emitter: EmitterService,
    ) { }

    public leavePc(): void {
        this.emitter.action<keyof GlobalStateInterface>(GameState.goToScene).emit('deskQs');
        console.log('meh');
    }

    /**
     * setup
     */
    public setup(): void {
        this.pixiApp = createPixiApp(this.canvas);
    }
}
