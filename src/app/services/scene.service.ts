/*!
 * @copyright FLYACTS GmbH 2022
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Scene } from '../enum';


@Injectable({
    providedIn: 'root',
})
export class SceneService {

    public pixiApp?: PIXI.Application;

    public currentScene: WritableSignal<Scene>;

    public isQsDeskLightOn: WritableSignal<boolean> = signal(false);
    public isDevDeskMikeLightOn: WritableSignal<boolean> = signal(false);
    public isDevDeskToniBoxOpen: WritableSignal<boolean> = signal(false);

    public fridgeState: WritableSignal<'closed' | 'open' | 'freezer-open'> = signal('closed');
    public isFridgeLocked: WritableSignal<boolean> = signal(true);
    public isFreezerLocked: WritableSignal<boolean> = signal(true);
    
    private CURRENT_SCENE = 'CURRENT_SCENE';
    private FALLBACK_SCENE = 0;


    public constructor() {
        this.currentScene = signal(this.getCurrentScene());

        effect(() => {
            this.clear();
            localStorage.setItem(this.CURRENT_SCENE, this.currentScene().toString());
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
    private getCurrentScene(): Scene {
        const scene = localStorage.getItem(this.CURRENT_SCENE);

        return scene ? +scene : this.FALLBACK_SCENE;
    }
}
