/*!
 * @copyright FLYACTS GmbH 2023
 */

import { trigger } from '@angular/animations';
import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { fadeInAnimation, fadeOutAnimation } from '../../animations';
import { Scene } from '../../enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';

@Component({
    selector: 'app-desk-dev-mike',
    templateUrl: './desk-dev-mike.component.html',
    styleUrls: ['./desk-dev-mike.component.scss'],
    animations: [
        trigger('fadeIn', [fadeInAnimation]),
        trigger('fadeOut', [fadeOutAnimation]),
    ],
})
export class DeskDevMikeComponent implements OnInit {

    public iconSrc: Signal<string> = computed(() => !this.sceneService.isDevDeskMikeLightOn()
        ? '../../../assets/images/desk_dev2_1.png'
        : '../../../assets/images/desk_dev2_2.png',
    );

    public isLampMenuOpen = signal(false);
    public lampMenuOptions = computed(() => this.sceneService.isDevDeskMikeLightOn()
        ? ['Turn off lamp', 'Unscrew light bulb', 'Cancel']
        : ['Turn on lamp', 'Unscrew light bulb', 'Cancel'],
    );

    public constructor(
        private sceneService: SceneService,
        private textService: TextService,
    ) { }

    /**
     * on init
     */
    public async ngOnInit(): Promise<void> {
        const leaveDesk = this.createFloorArrow();
        const lampIcon = await this.createLampIcon();

        this.sceneService.pixiApp?.stage.addChild(leaveDesk);
        this.sceneService.pixiApp?.stage.addChild(lampIcon);
    }

    /**
     * create arrow to floorQs
     */
    public createFloorArrow(): Arrow {
        const leaveDesk = createArrow({
            tipX: 1500,
            tipY: 950,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.FloorAc);
        };

        return leaveDesk;
    }

    /**
     * on lamp menu option click
     */
    public onLampMenuOptionClick(
        index: number,
    ): void {
        if (index === 0) {
            this.sceneService.isDevDeskMikeLightOn.set(!this.sceneService.isDevDeskMikeLightOn());
        }

        if (index === 1) {
            this.textService.showText('Picked up light bulb', 2000);
            this.sceneService.isDevDeskMikeLightOn.set(false);
        }

        this.isLampMenuOpen.set(false);
    }

    /**
     * create lamp icon
     */
    private async createLampIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/lamp.svg', 590, 130);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.isLampMenuOpen.set(true);
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
