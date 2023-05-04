/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit, Signal, WritableSignal, computed, effect, signal } from '@angular/core';

import { Arrow, createArrow, createIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import * as PIXI from 'pixi.js';

@Component({
    selector: 'app-desk-qs',
    templateUrl: './desk-qs.component.html',
    styleUrls: ['./desk-qs.component.scss'],
})
export class DeskQsComponent implements OnInit {

    public iconSrc: Signal<string>;
    public isLampOn: WritableSignal<boolean>;
    

    public constructor(
        private sceneService: SceneService,
    ) {

        this.isLampOn = signal(false);
        this.iconSrc = computed(() => !this.isLampOn()
            ? '../../../assets/images/desk_qs_1.png'
            : '../../../assets/images/desk_qs_2.png'
        );

        // initialize and play audio when lamp is turned on
        const lampOnaudio = new Audio();

        lampOnaudio.src = '../../assets/audio/secret2.mp3';
        lampOnaudio.load();

        effect(async () => {
            if (this.isLampOn()) {
                await lampOnaudio.play();
            }
        });
    }

    public async ngOnInit(): Promise<void> {
        const leaveDeskArrow = this.createFloorQsArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskArrow);

        const lampIcon = await this.createLampIcon();
        
        this.sceneService.pixiApp?.stage.addChild(lampIcon);

        const keyboardIcon = await this.createKeyboardIcon();

        this.sceneService.pixiApp?.stage.addChild(keyboardIcon);
    }

    /**
     * create arrow to floorQs
     */
    public createFloorQsArrow(): Arrow {
        const leaveDesk = createArrow({
            tipX: 100,
            tipY: 850,
            color: 0x212121,
            direction: 'left',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set('floorQs');
        };

        return leaveDesk;
    }

    /**
     * create lamp icon
     */
    private async createLampIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/lamp.svg', 890, 180);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.isLampOn.set(!this.isLampOn());
        };

        // be visible on hover
        sprite.onmouseover = (): void => {
            sprite.alpha = 1;

            // be invisible again on leave
            sprite.onmouseleave = (): void => {
                sprite.alpha = 0;
            }
        };

        return sprite;
    }

    /**
     * create keyboard icon
     */
    private async createKeyboardIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/search.svg', 705, 625);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            // do stuff
        };

        // be visible on hover
        sprite.onmouseover = (): void => {
            sprite.alpha = 1;

            // be invisible again on leave
            sprite.onmouseleave = (): void => {
                sprite.alpha = 0;
            }
        };

        return sprite;
    }
}
