/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component } from '@angular/core';

import { Scene } from '../../enum';
import { createArrow, createCircle } from '../../helpers';
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

    public goToDeskDev3(): void {
        this.sceneService.currentScene.set(Scene.DeskDev3);
    }

    public goToACFloor(): void {
        this.sceneService.currentScene.set(Scene.FloorAc);
    }

    /**
     * setup
     */
    public setup(): void {
        const goToQSDesk = createArrow({
            tipX: 1700,
            tipY: 400,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 20,
        });

        goToQSDesk.onmouseup = (): void => {
            this.goToQsDesk();
        };

        this.sceneService.pixiApp?.stage.addChild(goToQSDesk);

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

        const goToDeskDev3 = createCircle({
            x: 1050,
            y: 650,
            size: 20,
            color: 0x10ABF3,
        });

        goToDeskDev3.onmouseup = (): void => {
            this.goToDeskDev3();
        };

        this.sceneService.pixiApp?.stage.addChild(goToDeskDev3);


    }
}
