/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, Signal, signal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Scene } from '../../enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';

@Component({
    selector: 'app-desk-ds-sascha',
    templateUrl: './desk-ds-sascha.component.html',
    styleUrls: ['./desk-ds-sascha.component.scss'],
})
export class DeskDsSaschaComponent {

    public iconSrc: Signal<string>;
    public stormTrooperAudio: HTMLAudioElement;

    public constructor(
        private sceneService: SceneService,
        private textService: TextService,
    ) {
        this.iconSrc = signal('../../../assets/images/desk_ds_2.png');
        this.stormTrooperAudio = new Audio();

        this.stormTrooperAudio.src = '../../assets/audio/stormtrooper.wav';
        this.stormTrooperAudio.load();
    }

    public async ngOnInit(): Promise<void> {
        const toDeskDevToni = this.createDeskDevToniArrow();
        const stormTrooperIcon = await this.createStormTrooperIcon();
        const keyboardIcon = await this.createKeyboardIcon();

        this.sceneService.pixiApp?.stage.addChild(toDeskDevToni);
        this.sceneService.pixiApp?.stage.addChild(stormTrooperIcon);
        this.sceneService.pixiApp?.stage.addChild(keyboardIcon);
    }

    /**
     * create arrow to Desk Dev Toni
     */
    public createDeskDevToniArrow(): Arrow {
        const toDeskToni = createArrow({
            tipX: 1550,
            tipY: 950,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 0,
        });

        toDeskToni.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevToni);
        };

        return toDeskToni;
    }

    /**
     * create stormtrooper icon
     */
    private async createStormTrooperIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/search.svg', 840, 550);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = async (): Promise<void> => {
            await this.stormTrooperAudio.play();
            this.textService.showText('How old am I?');
        };

        // be visible on hover
        sprite.onmouseover = (): void => {
            sprite.alpha = 1;

            // be invisible again on leave
            sprite.onmouseleave = (): void => {
                sprite.alpha = 0;
            };
        };

        return sprite;
    }

    /**
     * create keyboard icon
     */
    private async createKeyboardIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/search.svg', 650, 630);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDsSaschaKeyboard);
        };

        // be visible on hover
        sprite.onmouseover = (): void => {
            sprite.alpha = 1;

            // be invisible again on leave
            sprite.onmouseleave = (): void => {
                sprite.alpha = 0;
            };
        };

        return sprite;
    }
}
