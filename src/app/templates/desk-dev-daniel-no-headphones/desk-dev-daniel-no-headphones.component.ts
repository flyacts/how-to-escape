/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Scene } from '../../enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-desk-dev-daniel-no-headphones',
    templateUrl: './desk-dev-daniel-no-headphones.component.html',
    styleUrls: ['./desk-dev-daniel-no-headphones.component.scss'],
})
export class DeskDevDanielNoHeadphonesComponent implements OnInit {

    private noise?: HTMLAudioElement;

    public constructor(
        private sceneService: SceneService,
    ) { }

    public async ngOnInit(): Promise<void> {
        const leaveDeskToQs = this.createFloorQsArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskToQs);

        const leaveDeskToAc = this.createFloorAcArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskToAc);

        const headphonesIconLeft = await this.createHeadphonesIcon(140, 460);
        const headphonesIconRight = await this.createHeadphonesIcon(1360, 460);

        this.sceneService.pixiApp?.stage.addChild(headphonesIconLeft);
        this.sceneService.pixiApp?.stage.addChild(headphonesIconRight);

        // this.noise = await this.playNoise();
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
            this.noise?.pause();
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
            this.noise?.pause();
        };

        return leaveDesk;
    }

    public async playNoise(): Promise<HTMLAudioElement> {
        // TODO: use a audio file with a riddle
        const noise = new Audio();

        noise.src = '../assets/audio/noise.mp3';
        noise.load();
        noise.loop = true;
        await noise.play();

        return noise;
    }

    /**
     * create headphones off icon
     */
    private async createHeadphonesIcon(x: number, y: number): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/headphones_off.svg', x, y);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevDaniel);
            this.noise?.pause();
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
