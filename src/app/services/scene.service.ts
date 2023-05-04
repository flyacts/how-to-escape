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


    public isQsDeskLightOn: WritableSignal<boolean> = signal(false);

    public constructor() {
        this.currentScene = signal(this.getCurrentScene());

        effect(() => {
            this.clear();
            localStorage.setItem(this.CURRENT_SCENE, this.currentScene());
        });

        // initialize and play audio when desk qs lamp is turned on
        const lampOnaudio = new Audio();

        lampOnaudio.src = '../../assets/audio/secret2.mp3';
        lampOnaudio.load();

        effect(async () => {
            if (this.isQsDeskLightOn()) {
                await lampOnaudio.play();
            }
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
