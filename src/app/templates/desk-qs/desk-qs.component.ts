/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, computed, OnInit, Signal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Scene } from '../../enum';
import { Arrow, createArrow, createIcon, createLampIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-desk-qs',
    templateUrl: './desk-qs.component.html',
    styleUrls: ['./desk-qs.component.scss'],
})
export class DeskQsComponent implements OnInit {

    public iconSrc: Signal<string>;

    public constructor(
        private sceneService: SceneService,
    ) {
        this.iconSrc = computed(() => !this.sceneService.isQsDeskLightOn()
            ? '../../../assets/images/desk_qs_1.png'
            : '../../../assets/images/desk_qs_2.png',
        );
    }

    public async ngOnInit(): Promise<void> {
        const leaveDeskArrow = this.createFloorQsArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskArrow);

        const lampIcon = await createLampIcon(890, 180, this.sceneService.isQsDeskLightOn);

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
