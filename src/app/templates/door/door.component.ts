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
        const goToCouch = this.createCouchTarget();
        const goToFlyman = this.createFlymanTeleport();
        const goToFridge = this.createFridgeTarget();

        this.sceneService.pixiApp?.stage.addChild(goToFloorAC);
        this.sceneService.pixiApp?.stage.addChild(goToCouch);
        this.sceneService.pixiApp?.stage.addChild(goToFlyman);
        this.sceneService.pixiApp?.stage.addChild(goToFridge);
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

    public createCouchTarget(): InteractionCircle {
        const goToCouch = createCircle({
            x: 180,
            y: 930,
            color: 0x10ABF3,
            size: 20,
        });
    
        goToCouch.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.Couch);
        };
    
        return goToCouch;
    }

    public createFridgeTarget(): InteractionCircle {
        const goToCouch = createCircle({
            x: 1300,
            y: 930,
            color: 0x10ABF3,
            size: 20,
        });
    
        goToCouch.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.Fridge);
        };
    
        return goToCouch;
    }

    /**
     * create clickable to Flyman scene
     */
    public createFlymanTeleport(): InteractionCircle {
        const goToDesk = createCircle({
            x: 1020,
            y: 610,
            size: 10,
            color: 0x10ABF3,
        });

        goToDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.Flyman);
        };

        return goToDesk;
    }

}
