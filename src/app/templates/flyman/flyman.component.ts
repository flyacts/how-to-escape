/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { Scene } from '../../enum';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-flyman',
    templateUrl: './flyman.component.html',
    styleUrls: ['./flyman.component.scss'],
})
export class FlymanComponent implements OnInit {
    public iconSrc: WritableSignal<string> = signal('../../../assets/images/dresden-night.png');

    public constructor(
        private sceneService: SceneService,
    ) { }

    public ngOnInit(): void {
        const clickAudio = new Audio('../../../assets/audio/click.wav');

        setTimeout(async () => {
            this.iconSrc.set('../../../assets/images/dresden-night-sign.png');
            await clickAudio.play();

            setTimeout(() => {
                this.sceneService.currentScene.set(Scene.Door);
            }, 2000);
        }, 2000);
    }
}
