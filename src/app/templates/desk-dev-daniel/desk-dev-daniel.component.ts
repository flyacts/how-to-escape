/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Scene } from '../../enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-desk-dev-daniel',
    templateUrl: './desk-dev-daniel.component.html',
    styleUrls: ['./desk-dev-daniel.component.scss'],
})
export class DeskDevDanielComponent implements OnInit {

    public constructor(
        private sceneService: SceneService,
    ) {  }

    public async ngOnInit(): Promise<void> {
        const leaveDeskToQs = this.createFloorQsArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskToQs);

        const leaveDeskToAc = this.createFloorAcArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskToAc);

        const headphonesIcon = await this.createHeadphonesIcon();

        this.sceneService.pixiApp?.stage.addChild(headphonesIcon);
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

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevDanielHeadphones);
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
