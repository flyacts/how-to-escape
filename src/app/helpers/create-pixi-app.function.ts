/*!
 * @copyright FLYACTS GmbH 2022
 */

import { ElementRef } from '@angular/core';
import * as PIXI from 'pixi.js';

export function createPixiApp(
    canvas: ElementRef<HTMLCanvasElement>,
): PIXI.Application {
    const height = 1080;
    const width = 1618;

    const app = new PIXI.Application({
        backgroundAlpha: 0,
        view: canvas.nativeElement,
        height,
        width,
        resolution: 1,
        antialias: true,
    });

    canvas.nativeElement.height = height;
    canvas.nativeElement.width = width;

    return app;
}
