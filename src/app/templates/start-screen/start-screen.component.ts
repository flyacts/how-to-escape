/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';
import { Graphics, Text } from 'pixi.js';

import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-start-screen',
    templateUrl: './start-screen.component.html',
    styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {

    public constructor(
        private sceneService: SceneService,
    ) { }

    public ngOnInit(): void {

        const go = new Graphics();

        const points = [
            1150, 812,
            1180, 812,
            1187, 852,
            1157, 852,
        ];

        go.beginFill(0xA1C3DD);
        go.drawPolygon(points);
        go.endFill();
        // go.alpha = 0.5;

        go.interactive = true;
        go.cursor = 'pointer';
        go.onmouseup = async (): Promise<void> => {
            await this.startGame();
        };

        this.sceneService.pixiApp?.stage.addChild(go);

        const goText = new Text('GO', { fontSize: 20, fontWeight: 'bold' });

        goText.position.set(1178, 818);
        goText.angle = 82;
        goText.skew.set(-0.2, -0.05);

        this.sceneService.pixiApp?.stage.addChild(goText);
    }

    public async startGame(): Promise<void> {
        this.sceneService.currentScene.set('deskQs');

        // const audio = new Audio();

        // audio.src = '../../assets/audio/death.mp3';
        // audio.load();
        // await audio.play();

        const audioAmbience = new Audio();

        audioAmbience.src = '../assets/audio/ambience-haunted.wav';
        audioAmbience.load();
        audioAmbience.loop = true;
        await audioAmbience.play();
    }
}
