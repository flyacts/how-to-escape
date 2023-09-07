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
        const goToDoor = this.createDoorTeleport();
        const goToDevDeskDaniel = this.createDevDanielTeleport();
        const goToDevDeskMike = this.createDevMikeTeleport();
        const goToCouch = this.createCouchTarget();

        this.sceneService.pixiApp?.stage.addChild(goToCouch);        
        this.sceneService.pixiApp?.stage.addChild(goToDoor);
        this.sceneService.pixiApp?.stage.addChild(goToDevDeskDaniel);
        this.sceneService.pixiApp?.stage.addChild(goToDevDeskMike);
    }

    public goToQsFloor(): void {
        this.sceneService.currentScene.set(Scene.FloorQs);
    }

    /**
     * create clickable to Daniel's desk
     */
    public createDevDanielTeleport(): InteractionCircle {
        const goToDesk = createCircle({
            x: 1400,
            y: 800,
            size: 20,
            color: 0x10ABF3,
        });

        goToDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevDaniel);
        };

        return goToDesk;
    }

    /**
     * create clickable to Mike's desk
     */
    public createDevMikeTeleport(): InteractionCircle {
        const goToDesk = createCircle({
            x: 180,
            y: 800,
            size: 20,
            color: 0x10ABF3,
        });

        goToDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevMike);
        };

        return goToDesk;
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

    public createCouchTarget(): InteractionCircle {
        const goToCouch = createCircle({
            x: 580,
            y: 650,
            color: 0x10ABF3,
            size: 20,
        });
    
        goToCouch.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.Couch);
        };
    
        return goToCouch;

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
