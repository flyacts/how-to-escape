/*!
 * @copyright FLYACTS GmbH 2023
 */

import { trigger } from '@angular/animations';
import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { fadeInAnimation, fadeOutAnimation } from '../../animations';
import { LightBulbState, Scene } from '../../enum';
import { InventoryItemEnum } from '../../enum/inventory-items.enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { InventoryItemInterface } from '../../interfaces/inventory-item.interface';
import { InventoryService } from '../../services/inventory.service';
import { LightBulbService } from '../../services/light-bulb.service';
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

    public imgSrc: Signal<string> = computed(() => !this.sceneService.isDevDeskMikeLightOn()
        ? '../../../assets/images/desk_dev2_1.png'
        : '../../../assets/images/desk_dev2_2.png',
    );

    public isLampMenuOpen = signal(false);
    public lampMenuOptions = computed(() => this.sceneService.isDevDeskMikeLightOn()
        ? ['Turn lamp off', 'Unscrew light bulb', 'Cancel']
        : ['Turn lamp on', 'Unscrew light bulb', 'Cancel'],
    );

    public constructor(
        private lightBulbService: LightBulbService,
        private sceneService: SceneService,
        private textService: TextService,
        private inventoryService: InventoryService,
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
        // toggle lamp
        if (index === 0) {
            this.sceneService.isDevDeskMikeLightOn.set(!this.sceneService.isDevDeskMikeLightOn());
        }

        // unscrew lamp and put it in inventory
        if (index === 1) {
            const item: InventoryItemInterface = {
                name: InventoryItemEnum.Lightbulb,
                imageName: 'pineapple.webp',
            };

            this.inventoryService.addItemToInventory(item);
            this.textService.showText('Picked up light bulb.', 2000);
            this.sceneService.isDevDeskMikeLightOn.set(false);
            this.lightBulbService.lightBulbState.set(LightBulbState.InInventory);
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
            // only show menu if light bulb is still unscrewed in here
            if (this.lightBulbService.lightBulbState() === LightBulbState.InDevMikesLamp) {
                this.isLampMenuOpen.set(true);
            } else {
                this.textService.showText('There is no light bulb in here.', 3000);
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
}
