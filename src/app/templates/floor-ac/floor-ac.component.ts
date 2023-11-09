/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, OnInit } from '@angular/core';
import { Sprite } from 'pixi.js';

import { Scene } from '../../enum';
import { Arrow, createArrow, createCircle, createIcon, InteractionCircle } from '../../helpers';
import { createRectangle, Rectangle } from '../../helpers/create-rectangle.function';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-floor-ac',
    templateUrl: './floor-ac.component.html',
    styleUrls: ['./floor-ac.component.scss'],
})
export class FloorAcComponent implements OnInit {

    private mgsAlert!: Sprite;

    public constructor(
        private sceneService: SceneService,
    ) { }

    public async ngOnInit(): Promise<void> {
        const goToDoor = this.createDoorTeleport();
        const goToDevDeskDaniel = this.createDevDanielTeleport();
        const goToDevDeskMike = this.createDevMikeTeleport();
        const goToDevDeskToni = this.createDevToniTeleport();
        const goToCouch = this.createCouchTarget();
        const goToFridge = this.createFridgeTarget();

        const boxTrigger = this.createBoxTrigger();

        this.mgsAlert = await createIcon('../../../assets/icons/mgs_alert.svg', 390, 0, 100, 100);
        this.mgsAlert.alpha = 0;

        this.sceneService.pixiApp?.stage.addChild(goToCouch);
        this.sceneService.pixiApp?.stage.addChild(goToDoor);
        this.sceneService.pixiApp?.stage.addChild(goToFridge);
        this.sceneService.pixiApp?.stage.addChild(goToDevDeskDaniel);
        this.sceneService.pixiApp?.stage.addChild(goToDevDeskMike);
        this.sceneService.pixiApp?.stage.addChild(goToDevDeskToni);
        this.sceneService.pixiApp?.stage.addChild(boxTrigger);
        this.sceneService.pixiApp?.stage.addChild(this.mgsAlert);
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
     * create clickable to Toni's desk
     */
    public createDevToniTeleport(): InteractionCircle {
        const goToDesk = createCircle({
            x: 1100,
            y: 660,
            size: 20,
            color: 0x10ABF3,
        });

        goToDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevToni);
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

    public createFridgeTarget(): InteractionCircle {
        const goToFridge = createCircle({
            x: 990,
            y: 590,
            color: 0x10ABF3,
            size: 20,
        });

        goToFridge.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.Fridge);
        };

        return goToFridge;
    }

    public createBoxTrigger(): Rectangle {
        const boxTrigger = createRectangle({
            x: 410,
            y: 135,
            width: 45,
            height: 70,
            angle: -3,
            color: 0x10ABF3,
            alpha: 0,
        });

        boxTrigger.onmouseup = async (): Promise<void> => {
            const audio = new Audio();

            audio.src = '../../../assets/audio/mgs_alert.mp3';
            audio.load();

            await audio.play();

            setTimeout(() => {
                this.mgsAlert.alpha = 1;

                setTimeout(() => {
                    this.mgsAlert.alpha = 0;
                }, 1500);
            }, 200);
        };

        return boxTrigger;
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
