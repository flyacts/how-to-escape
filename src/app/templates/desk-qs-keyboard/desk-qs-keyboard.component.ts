/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, computed, Signal } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import { Rectangle, createRectangle } from '../../helpers/create-rectangle.function';

const KEYS: Map<string, { x: number, y: number }> = new Map();

KEYS.set('c', { x: 384, y: 740 });
KEYS.set('r', { x: 396, y: 624 });
KEYS.set('4', { x: 370, y: 566 });
KEYS.set('f', { x: 410, y: 682 });
KEYS.set('t', { x: 454, y: 626 });
KEYS.set('w', { x: 280, y: 624 });
KEYS.set('3', { x: 308, y: 566 });
KEYS.set('k', { x: 638, y: 686 });

@Component({
    selector: 'app-desk-qs-keyboard',
    templateUrl: './desk-qs-keyboard.component.html',
    styleUrls: ['./desk-qs-keyboard.component.scss'],
})
export class DeskQsKeyboardComponent {

    public iconSrc: Signal<string>;

    public text = '';

    public constructor(
        private sceneService: SceneService,
    ) {
        this.iconSrc = computed(() => !this.sceneService.isQsDeskLightOn()
            ? '../../../assets/images/desk_qs_keyboard_1.png'
            : '../../../assets/images/desk_qs_keyboard_2.png',
        );

        // TODO: add fail and success audio
        const enterAudio = new Audio();

        enterAudio.src = '../../assets/audio/enter.wav';
        enterAudio.load();

        const arrow = this.createDeskQsArrow();

        this.sceneService.pixiApp?.stage.addChild(arrow);

        for (const key of KEYS.entries()) {
            const keyRect = this.createKeyRect(key[1].x, key[1].y);

            keyRect.on('mouseup', () => {
                console.log(`pressed ${key[0]}`);

                this.text = `${this.text}${key[0]}`;
                this.text = this.text.substring(0, 9);
            });

            this.sceneService.pixiApp?.stage.addChild(keyRect);
        }

        const keyEnterRect = createRectangle({
            x: 910,
            y: 630,
            color: 0x212121,
            width: 64,
            height: 96,
            angle: 0,
            alpha: 0,
        });

        keyEnterRect.on('mouseup', () => {
            console.log(`pressed enter`);

            this.text = '';

            enterAudio.play();
        });

        this.sceneService.pixiApp?.stage.addChild(keyEnterRect);

        const keyBackspaceRect = createRectangle({
            x: 880,
            y: 570,
            color: 0x212121,
            width: 106,
            height: 42,
            angle: 0,
            alpha: 0,
        });

        keyBackspaceRect.on('mouseup', () => {
            console.log(`pressed backspace`);

            this.text = this.text.slice(0, -1);
        });

        this.sceneService.pixiApp?.stage.addChild(keyBackspaceRect);
    }

    /**
     * create arrow to deskQs
     */
    public createDeskQsArrow(): Arrow {
        const deskQs = createArrow({
            tipX: 800,
            tipY: 1050,
            color: 0x212121,
            direction: 'bottom',
            size: 100,
            angle: 0,
        });

        deskQs.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskQS);
        };

        return deskQs;
    }

    /**
     * create arrow to deskQs
     */
    public createKeyRect(x: number, y: number): Rectangle {
        const keyRect = createRectangle({
            x,
            y,
            color: 0x212121,
            width: 32,
            height: 32,
            angle: 0,
            alpha: 0,
        });

        return keyRect;
    }
}
