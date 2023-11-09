/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, computed, Signal } from '@angular/core';

import { FridgeState, Scene } from '../../enum';
import { Arrow, createArrow } from '../../helpers';
import { createRectangle, Rectangle } from '../../helpers/create-rectangle.function';
import { FridgeService } from '../../services/fridge.service';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';

const KEYS: Map<string, { x: number, y: number }> = new Map();

// set keyboard coordinates
KEYS.set('^', { x: 132, y: 560 });
KEYS.set('1', { x: 192, y: 560 });
KEYS.set('2', { x: 250, y: 562 });
KEYS.set('3', { x: 304, y: 562 });
KEYS.set('4', { x: 366, y: 564 });
KEYS.set('5', { x: 424, y: 564 });
KEYS.set('6', { x: 480, y: 566 });
KEYS.set('7', { x: 538, y: 566 });
KEYS.set('8', { x: 592, y: 566 });
KEYS.set('9', { x: 652, y: 568 });
KEYS.set('0', { x: 708, y: 568 });
KEYS.set('ß', { x: 768, y: 570 });
KEYS.set('´', { x: 824, y: 570 });

KEYS.set('q', { x: 222, y: 620 });
KEYS.set('w', { x: 280, y: 620 });
KEYS.set('e', { x: 336, y: 622 });
KEYS.set('r', { x: 394, y: 622 });
KEYS.set('t', { x: 450, y: 624 });
KEYS.set('z', { x: 508, y: 624 });
KEYS.set('u', { x: 566, y: 626 });
KEYS.set('i', { x: 624, y: 626 });
KEYS.set('o', { x: 682, y: 628 });
KEYS.set('p', { x: 740, y: 628 });
KEYS.set('ü', { x: 796, y: 630 });
KEYS.set('+', { x: 854, y: 630 });

KEYS.set('a', { x: 238, y: 676 });
KEYS.set('s', { x: 294, y: 676 });
KEYS.set('d', { x: 352, y: 678 });
KEYS.set('f', { x: 410, y: 678 });
KEYS.set('g', { x: 466, y: 678 });
KEYS.set('h', { x: 524, y: 680 });
KEYS.set('j', { x: 580, y: 680 });
KEYS.set('k', { x: 638, y: 680 });
KEYS.set('l', { x: 694, y: 682 });
KEYS.set('ö', { x: 754, y: 682 });
KEYS.set('ä', { x: 810, y: 684 });
KEYS.set('#', { x: 868, y: 684 });

KEYS.set('<', { x: 210, y: 732 });
KEYS.set('y', { x: 266, y: 732 });
KEYS.set('x', { x: 324, y: 734 });
KEYS.set('c', { x: 380, y: 734 });
KEYS.set('v', { x: 440, y: 736 });
KEYS.set('b', { x: 494, y: 738 });
KEYS.set('n', { x: 550, y: 738 });
KEYS.set('m', { x: 610, y: 738 });
KEYS.set(',', { x: 666, y: 740 });
KEYS.set('.', { x: 724, y: 740 });
KEYS.set('-', { x: 778, y: 740 });

@Component({
    selector: 'app-desk-qs-keyboard',
    templateUrl: './desk-qs-keyboard.component.html',
    styleUrls: ['./desk-qs-keyboard.component.scss'],
})
export class DeskQsKeyboardComponent {

    public iconSrc: Signal<string>;

    public text = '';

    public constructor(
        private fridgeService: FridgeService,
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
                this.fridgeService.isFridgeLocked.set(false);
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
            width: 40,
            height: 40,
            angle: 0,
            alpha: 0,
        });
    }
}
