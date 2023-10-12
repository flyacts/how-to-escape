/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, computed, OnInit, Signal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { LightBulbState, Scene } from '../../enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { LightBulbService } from '../../services/light-bulb.service';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';

@Component({
    selector: 'app-desk-qs',
    templateUrl: './desk-qs.component.html',
    styleUrls: ['./desk-qs.component.scss'],
})
export class DeskQsComponent implements OnInit {

    public iconSrc: Signal<string>;

    public constructor(
        private lightBulbService: LightBulbService,
        private sceneService: SceneService,
        private textService: TextService,
    ) {
        this.iconSrc = computed(() => !this.sceneService.isQsDeskLightOn()
            ? '../../../assets/images/desk_qs_1.png'
            : '../../../assets/images/desk_qs_2.png',
        );
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
            this.sceneService.currentScene.set(Scene.FloorQs);
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
            if (this.lightBulbService.lightBulbState() === LightBulbState.InQsDeskLamp) {
                this.sceneService.isQsDeskLightOn.set(!this.sceneService.isQsDeskLightOn());
            } else {
                this.textService.showText(
                    'The lamp is not working. Maybe there is another light bulb here anywhere?',
                    4000,
                );
            }
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
        const sprite = await createIcon('../../../assets/icons/search.svg', 705, 625);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskQSKeyboard);
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
