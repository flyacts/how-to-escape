/*!
 * @copyright FLYACTS GmbH 2023
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Scene } from '../enum';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root',
})
export class SceneService {

    public pixiApp?: PIXI.Application;

    public isGameStarted = false;
    public currentScene: WritableSignal<Scene>;

    public isQsDeskLightOn: WritableSignal<boolean> = signal(false);
    public isDevDeskMikeLightOn: WritableSignal<boolean> = signal(false);
    public isDevDeskToniBoxOpen: WritableSignal<boolean> = signal(false);

    public fridgeState: WritableSignal<'closed' | 'open' | 'freezer-open'> = signal('closed');
    public isFridgeLocked: WritableSignal<boolean> = signal(true);
    public isFreezerLocked: WritableSignal<boolean> = signal(true);

    public showInventory: WritableSignal<boolean> = signal(false);

    public constructor(
        private localStorageService: LocalStorageService,
    ) {
        const currentScene = this.getCurrentSceneOnGameStart();

        this.currentScene = signal(currentScene);

        if (this.currentScene() !== Scene.Start) {
            this.showInventory.set(true);
        }

        effect(() => {
            this.clear();
            this.localStorageService.set('CURRENT_SCENE', this.currentScene());
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
     * get current scene at the start of the game
     */
    private getCurrentSceneOnGameStart(): Scene {
        const currentScene = this.localStorageService.get('CURRENT_SCENE');

        // no scene means game was not started yet --> use start scene
        if (currentScene === null) {
            return Scene.Start;
        }

        // prevents loading the intro again, when reloading the window
        if (currentScene === Scene.DeskQSIntro) {
            return Scene.DeskQS;
        }

        return currentScene;
    }
}
