/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit, Signal, WritableSignal, computed, signal } from '@angular/core';

import { Arrow, createArrow } from '../../helpers';
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
    }

    public async ngOnInit(): Promise<void> {
        const leaveDeskArrow = this.createFloorQsArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskArrow);

        const lampIcon = await this.createLampIcon();
        
        this.sceneService.pixiApp?.stage.addChild(lampIcon);
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
        const lampIconPath = '../../../assets/icons/lamp.svg';
        const texture = await PIXI.Texture.fromURL(lampIconPath);
        const sprite = PIXI.Sprite.from(texture);

        sprite.interactive = true;
        sprite.cursor = 'pointer';
        sprite.position.x = 890;
        sprite.position.y = 180;

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
}
