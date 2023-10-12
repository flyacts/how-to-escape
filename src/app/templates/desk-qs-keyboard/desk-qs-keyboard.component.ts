/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, computed, Signal } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow } from '../../helpers';
import { createRectangle, Rectangle } from '../../helpers/create-rectangle.function';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';

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
        private textService: TextService,
    ) {
        this.iconSrc = computed(() => !this.sceneService.isQsDeskLightOn()
            ? '../../../assets/images/desk_qs_keyboard_1.png'
            : '../../../assets/images/desk_qs_keyboard_2.png',
        );

        const successAudio = new Audio();

        successAudio.src = '../../assets/audio/enter.wav';
        successAudio.load();

        const failureAudio = new Audio();

        failureAudio.src = '../../assets/audio/fail.mp3';
        failureAudio.load();

        const keypressAudio = new Audio();

        keypressAudio.src = '../../assets/audio/key-press.mp3';
        keypressAudio.load();

        const arrow = this.createDeskQsArrow();

        this.sceneService.pixiApp?.stage.addChild(arrow);

        for (const key of KEYS.entries()) {
            const keyRect = this.createKeyRect(key[1].x, key[1].y);

            keyRect.on('mouseup', async () => {
                console.log(`pressed ${key[0]}`);

                keypressAudio.pause();
                keypressAudio.currentTime = 0;
                await keypressAudio.play();

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

        keyEnterRect.on('mouseup', async () => {
            console.log(`pressed enter`);

            keypressAudio.pause();
            keypressAudio.currentTime = 0;
            await keypressAudio.play();

            if (this.text === 'cr4ftw3rk') {
                await successAudio.play();
                this.sceneService.isFridgeLocked.set(false);
                this.textService.showText('There was a click sound near the fridge.');
            } else {
                await failureAudio.play();
                this.textService.showText('Nothing happens.');
            }

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

        keyBackspaceRect.on('mouseup', async () => {
            console.log(`pressed backspace`);

            keypressAudio.pause();
            keypressAudio.currentTime = 0;
            await keypressAudio.play();

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
        return createRectangle({
            x,
            y,
            color: 0x212121,
            width: 32,
            height: 32,
            angle: 0,
            alpha: 0,
        });
    }
}
