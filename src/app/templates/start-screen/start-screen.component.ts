/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, OnInit } from '@angular/core';
import { Graphics, Text } from 'pixi.js';

import { Scene } from '../../enum';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';

@Component({
    selector: 'app-start-screen',
    templateUrl: './start-screen.component.html',
    styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {

    public constructor(
        private sceneService: SceneService,
        private textService: TextService,
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
        this.sceneService.currentScene.set(Scene.DeskQSIntro);

        // const audio = new Audio();

        // audio.src = '../../assets/audio/death.mp3';
        // audio.load();
        // await audio.play();

        const duration = 8000;

        const introText = `
            You hear a sound and then everything went black.
            The next thing you remember is waking up in a small office.
            How did and you get in here?
            And more importantly, how can you get out of here?'
        `;

        this.textService.showText(introText, duration);

        const audioIntro = new Audio();

        audioIntro.src = '../assets/audio/intro.mp3';
        audioIntro.load();
        // audioAmbience.loop = true;
        await audioIntro.play();

        setTimeout(() => {
            this.sceneService.showInventory.set(true);
        }, duration);
    }
}
