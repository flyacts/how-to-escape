/*!
 * @copyright FLYACTS GmbH 2023
 */

import '@pixi/graphics';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Application as PixiApp } from 'pixi.js';

import { createArrow, createPixiApp } from '../../helpers';

@Component({
    selector: 'app-canvas-test',
    templateUrl: './canvas-test.component.html',
    styleUrls: ['./canvas-test.component.scss'],
})
export class CanvasTestComponent {
    @ViewChild('canvas', { static: true })
    public canvas!: ElementRef<HTMLCanvasElement>;

    private pixiApp!: PixiApp;

    /**
     * setup
     */
    public setup(): void {
        this.pixiApp = createPixiApp(this.canvas);

        const goToFloorArrow = createArrow({
            tipX: 1500,
            tipY: 550,
            color: 0x212121,
            direction: 'bottom',
            size: 100,
            angle: 20,
        });

        this.pixiApp.stage.addChild(goToFloorArrow);

        const goToFridgeArrow = createArrow({
            tipX: 1600,
            tipY: 600,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 5,
        });

        this.pixiApp.stage.addChild(goToFridgeArrow);
    }
}
