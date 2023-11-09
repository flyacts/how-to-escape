/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component } from '@angular/core';
import { BlurFilter, Graphics } from 'pixi.js';

import { Scene } from '../../enum';
import { createArrow } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-floor-qs',
    templateUrl: './floor-qs.component.html',
    styleUrls: ['./floor-qs.component.scss'],
})
export class FloorQsComponent {

    public constructor(
        private sceneService: SceneService,
    ) { }

    public goToQsDesk(): void {
        this.sceneService.currentScene.set(Scene.DeskQS);
    }

    public goToDeskDevDaniel(): void {
        this.sceneService.currentScene.set(Scene.DeskDevDaniel);
    }

    public goToACFloor(): void {
        this.sceneService.currentScene.set(Scene.FloorAc);
    }

    /**
     * setup
     */
    public setup(): void {
        const qsDeskPath = [
            1210, 1100,
            1020, 820,
            1070, 810,
            1085, 735,
            1330, 770,
            1335, 795,
            1355, 805,
            1395, 620,
            1700, 680,
            1700, 1100,
        ];
        const qsDeskOutline = this.createOutline(qsDeskPath);

        qsDeskOutline.onmouseup = (): void => {
            this.goToQsDesk();
        };
        this.sceneService.pixiApp?.stage.addChild(qsDeskOutline);

        const devDanielDeskPath = [
            1020, 820,
            1070, 810,
            1085, 735,
            1330, 770,
            1335, 795,
            1355, 805,
            1360, 775,
            1165, 660,
            1180, 580,
            1165, 570,
            1165, 540,
            1115, 510,
            995, 490,
            990, 580,
            1050, 600,
            1050, 610,
            885, 610,
        ];
        const devDanielDeskOutline = this.createOutline(devDanielDeskPath);

        devDanielDeskOutline.onmouseup = (): void => {
            this.goToDeskDevDaniel();
        };
        this.sceneService.pixiApp?.stage.addChild(devDanielDeskOutline);


        const goToACFloor = createArrow({
            tipX: 700,
            tipY: 750,
            color: 0x212121,
            direction: 'top',
            size: 100,
        });

        goToACFloor.onmouseup = (): void => {
            this.goToACFloor();
        };

        this.sceneService.pixiApp?.stage.addChild(goToACFloor);

    }

    private createOutline(path: number[]): Graphics {
        const outline = new Graphics();

        outline.lineStyle(5, 0xEEEEEE, 1);
        outline.alpha = 0;
        outline.beginFill(0xEEEEEE, 0.3);
        outline.drawPolygon(path);
        outline.endFill();

        outline.interactive = true;
        outline.cursor = 'pointer';

        // blurry outline
        const blurFilter = new BlurFilter();

        blurFilter.blur = 5;
        outline.filters = [blurFilter];

        // be visible on hover
        outline.onmouseover = (): void => {
            outline.alpha = 1;

            // be invisible again on leave
            outline.onmouseleave = (): void => {
                outline.alpha = 0;
            };
        };

        return outline;
    }
}
