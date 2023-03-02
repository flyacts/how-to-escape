/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable } from '@angular/core';
import * as PIXI from 'pixi.js';


@Injectable({
    providedIn: 'root',
})
export class SceneService {

    public pixiApp?: PIXI.Application;

    public clear(): void {
        this.pixiApp?.stage.removeChildren();
    }
}

