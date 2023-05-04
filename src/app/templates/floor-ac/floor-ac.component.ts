/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';

import { Scene } from '../../enum';
import { createArrow, createCircle, InteractionCircle } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-floor-ac',
    templateUrl: './floor-ac.component.html',
    styleUrls: ['./floor-ac.component.scss'],
})
export class FloorAcComponent implements OnInit{

    public constructor(
        private sceneService: SceneService,
    ) { }

    public ngOnInit(): void {
        const goToDev3Desk = this.createDev3Teleport();

        this.sceneService.pixiApp?.stage.addChild(goToDev3Desk);
    }

    public goToQsFloor(): void {
        this.sceneService.currentScene.set(Scene.FloorQs);
    }

    /**
     * create clickable to dek dev 3
     */
    public createDev3Teleport(): InteractionCircle {
        const goToACFloor = createCircle({
            x: 1400,
            y: 800,
            size: 20,
            color: 0x10ABF3,
        });

        goToACFloor.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDev3);
        };

        return goToACFloor;
    }


    /**
     * setup
     */
    public setup(): void {
        const goToQSDesk = createArrow({
            tipX: 750,
            tipY: 1250,
            color: 0x212121,
            direction: 'bottom',
            size: 100,
            angle: -15,
        });

        goToQSDesk.onmouseup = (): void => {
            this.goToQsFloor();
        };

        this.sceneService.pixiApp?.stage.addChild(goToQSDesk);
    }
}
