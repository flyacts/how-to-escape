/*!
 * @copyright FLYACTS GmbH 2022
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import * as PIXI from 'pixi.js';


@Injectable({
    providedIn: 'root',
})
export class SceneService {

    public pixiApp?: PIXI.Application;

    public currentScene: WritableSignal<string>;

    private CURRENT_SCENE = 'CURRENT_SCENE';
    private FALLBACK_SCENE = 'game';

    public constructor() {
        this.currentScene = signal(this.getCurrentScene());

        effect(() => {
            this.clear();
            localStorage.setItem(this.CURRENT_SCENE, this.currentScene());
        });
    }

    /**
     * clear every graphics on the scene
     */
    public clear(): void {
        this.pixiApp?.stage.removeChildren();
    }

    /**
     * get the current scene
     */
    private getCurrentScene(): string {
        return localStorage.getItem(this.CURRENT_SCENE) ?? this.FALLBACK_SCENE;
    }
}
