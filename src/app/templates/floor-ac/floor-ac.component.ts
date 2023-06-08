/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow, createCircle, InteractionCircle } from '../../helpers';
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
        const goToDevDanielDesk = this.createDevDanielTeleport();
        const goToDoor = this.createDoorTeleport();
        
        this.sceneService.pixiApp?.stage.addChild(goToDevDanielDesk);
        this.sceneService.pixiApp?.stage.addChild(goToDoor);
    }

    public goToQsFloor(): void {
        this.sceneService.currentScene.set(Scene.FloorQs);
    }

    /**
     * create clickable to dek dev daniel
     */
    public createDevDanielTeleport(): InteractionCircle {
        const goToACFloor = createCircle({
            x: 1400,
            y: 800,
            size: 20,
            color: 0x10ABF3,
        });

        goToACFloor.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevDaniel);
        };

        return goToACFloor;
    }


    /**
     * create arrow to door
     */
    public createDoorTeleport(): Arrow {
        const arrow = createArrow({
            tipX: 810,
            tipY: 700,
            color: 0x212121,
            direction: 'top',
            size: 100,
            angle: 0,
        });

        arrow.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.Door);
        };

        return arrow;
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
