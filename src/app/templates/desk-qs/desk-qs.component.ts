/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmitterService } from '@ngxs-labs/emitter';
import * as PIXI from 'pixi.js';

import { GameState } from '../../states/game.state';
import { GlobalStateInterface } from '../../states/globalstate.interface';

@Component({
    selector: 'app-desk-qs',
    templateUrl: './desk-qs.component.html',
    styleUrls: ['./desk-qs.component.scss'],
})
export class DeskQsComponent {

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
        this.pixiApp = new PIXI.Application({
            backgroundAlpha: 0,
            view: this.canvas.nativeElement,
        });

        this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;
        this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;


    }

}
