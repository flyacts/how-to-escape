/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { BooleanEnum, Scene } from '../../enum';
import { FlymanService } from '../../services/flyman.service';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';


const SIGN_ON_IMAGE = '../../../assets/images/dresden-night-sign.png';
const SIGN_OFF_IMAGE = '../../../assets/images/dresden-night.png';

@Component({
    selector: 'app-flyman',
    templateUrl: './flyman.component.html',
    styleUrls: ['./flyman.component.scss'],
})
export class FlymanComponent implements OnInit {
    public iconSrc: WritableSignal<string>;


    public constructor(
        private sceneService: SceneService,
        private textService: TextService,
        private flymanService: FlymanService,
    ) {
        this.iconSrc = this.flymanService.isSignOn() === BooleanEnum.True
            ? signal(SIGN_ON_IMAGE)
            : signal(SIGN_OFF_IMAGE);
    }

    public ngOnInit(): void {
        const clickAudio = new Audio('../../../assets/audio/click.wav');

        setTimeout(async () => {
            if (this.flymanService.isSignOn() === BooleanEnum.True) {
                this.iconSrc.set(SIGN_OFF_IMAGE);
                this.flymanService.isSignOn.set(BooleanEnum.False);
            } else {
                this.iconSrc.set(SIGN_ON_IMAGE);
                this.flymanService.isSignOn.set(BooleanEnum.True);
            }
            await clickAudio.play();

            setTimeout(() => {
                this.sceneService.currentScene.set(Scene.Door);
                this.textService.showRandomText([
                    `It's not working`,
                    `Nothing happens...`,
                    `Maybe it's defect?`,
                ]);
            }, 2000);
        }, 2000);
    }
}
