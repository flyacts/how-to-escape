/*!
 * @copyright FLYACTS GmbH 2023
 */

import { trigger } from '@angular/animations';
import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { fadeInAnimation, fadeOutAnimation } from '../../animations';
import { HeadsetState, Scene } from '../../enum';
import { InventoryItemEnum } from '../../enum/inventory-items.enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { InventoryItemInterface } from '../../interfaces/inventory-item.interface';
import { HeadsetService } from '../../services/headset.service';
import { InventoryService } from '../../services/inventory.service';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';

@Component({
    selector: 'app-desk-dev-daniel',
    templateUrl: './desk-dev-daniel.component.html',
    styleUrls: ['./desk-dev-daniel.component.scss'],
    animations: [
        trigger('fadeIn', [fadeInAnimation]),
        trigger('fadeOut', [fadeOutAnimation]),
    ],
})
export class DeskDevDanielComponent implements OnInit {

    public isHeadsetMenuOpen = signal(false);
    public headsetMenuOptions = computed(() => ['Put on', 'Take', 'Cancel']);

    public imgSrc: Signal<string> = computed(() => this.headsetService.headsetState() !== HeadsetState.InInventory
        ? '../../../assets/images/desk_dev_daniel_1.png'
        : '../../../assets/images/desk_dev_daniel_2.png',
    );

    public constructor(
        private sceneService: SceneService,
        private inventoryService: InventoryService,
        private textService: TextService,
        private headsetService: HeadsetService,
    ) { }

    public async ngOnInit(): Promise<void> {
        const leaveDeskToQs = this.createFloorQsArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskToQs);

        const leaveDeskToAc = this.createFloorAcArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskToAc);

        if (this.headsetService.headsetState() === HeadsetState.OnDevDanielDesk) {
            const headphonesIcon = await this.createHeadphonesIcon();

            this.sceneService.pixiApp?.stage.addChild(headphonesIcon);
        }
    }

    /**
     * on headset menu option click
     */
    public onHeadsetMenuOptionClick(
        index: number,
    ): void {
        // toggle lamp
        if (index === 0) {
            this.sceneService.isDevDeskDanielHeadsetTaken.set(!this.sceneService.isDevDeskDanielHeadsetTaken());
        }

        // take headset and put it in inventory
        if (index === 1) {
            const item: InventoryItemInterface = {
                name: InventoryItemEnum.Headset,
                imageName: 'headset.png',
            };

            this.inventoryService.addItemToInventory(item);
            this.textService.showText('Picked up headset.', 2000);
            this.sceneService.isDevDeskDanielHeadsetTaken.set(true);
            this.headsetService.headsetState.set(HeadsetState.InInventory);

            const pixiObject = this.sceneService.pixiApp?.stage.getChildByName(InventoryItemEnum.Headset);

            if (pixiObject) {
                this.sceneService.pixiApp?.stage.removeChild(pixiObject);
            }
        }

        this.isHeadsetMenuOpen.set(false);
    }

    /**
     * create arrow to floorQs
     */
    public createFloorQsArrow(): Arrow {
        const leaveDesk = createArrow({
            tipX: 1500,
            tipY: 950,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.FloorQs);
        };

        return leaveDesk;
    }

    /**
     * create arrow to floorQs
     */
    public createFloorAcArrow(): Arrow {
        const leaveDesk = createArrow({
            tipX: 100,
            tipY: 950,
            color: 0x212121,
            direction: 'left',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.FloorAc);
        };

        return leaveDesk;
    }

    /**
     * create headphones on icon
     */
    private async createHeadphonesIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/headphones_on.svg', 465, 570);

        sprite.name = InventoryItemEnum.Headset;

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            // only show menu if headset is still on desk
            if (this.headsetService.headsetState() === HeadsetState.OnDevDanielDesk) {
                this.isHeadsetMenuOpen.set(true);
            } else {
                // this.textService.showText('There in no light bulb in here.', 3000);
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
