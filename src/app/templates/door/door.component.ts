/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow, createCircle, InteractionCircle } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-door',
    templateUrl: './door.component.html',
    styleUrls: ['./door.component.scss'],
})
export class DoorComponent implements OnInit{

    public constructor(
        private sceneService: SceneService,
    ) { }

    public ngOnInit(): void {
        const goToFloorAC = this.createFloorAcArrow();

        this.sceneService.pixiApp?.stage.addChild(goToFloorAC);
    }

    /**
     * create arrow to floorQs
     */
    public createFloorAcArrow(): Arrow {
        const leaveDoor = createArrow({
            tipX: 750,
            tipY: 1050,
            color: 0x212121,
            direction: 'bottom',
            size: 100,
            angle: 0,
        });

        leaveDoor.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.FloorAc);
        };

        return leaveDoor;
    }

}
