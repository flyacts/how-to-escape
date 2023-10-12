/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, computed, Signal, signal } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow  } from '../../helpers';
import { createRectangle, Rectangle } from '../../helpers/create-rectangle.function';
import { InventoryService } from '../../services/inventory.service';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';
import { InventoryItemEnum } from 'src/app/enum/inventory-items.enum';

const KEYS: Map<string, { x: number, y: number }> = new Map();

KEYS.set('1', { x: 200, y: 442 });
KEYS.set('2', { x: 250, y: 442 });
KEYS.set('3', { x: 300, y: 442 });
KEYS.set('4', { x: 350, y: 442 });
KEYS.set('5', { x: 400, y: 442 });
KEYS.set('6', { x: 450, y: 442 });
KEYS.set('7', { x: 500, y: 442 });
KEYS.set('8', { x: 550, y: 442 });
KEYS.set('9', { x: 600, y: 442 });
KEYS.set('0', { x: 650, y: 442 });

@Component({
    selector: 'app-desk-ds-sascha-keyboard',
    templateUrl: './desk-ds-sascha-keyboard.component.html',
    styleUrls: ['./desk-ds-sascha-keyboard.component.scss'],
})
export class DeskDsSaschaKeyboardComponent {
    public iconSrc: Signal<string>;

    public text = '';

    public constructor(
        private sceneService: SceneService,
        private textService: TextService,
        private inventoryService: InventoryService,
    ) {
        this.iconSrc = computed(() => './../../../assets/images/desk_ds_keyboard.png');
    }

    public ngOnInit(): void {
        const arrow = this.createDeskQsArrow();

        this.sceneService.pixiApp?.stage.addChild(arrow);

        const keypressAudio = new Audio();

        keypressAudio.src = '../../assets/audio/key-press.mp3';
        keypressAudio.load();

        const successAudio = new Audio();

        successAudio.src = '../../assets/audio/enter.wav';
        successAudio.load();

        const failureAudio = new Audio();

        failureAudio.src = '../../assets/audio/fail.mp3';
        failureAudio.load();

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
            x: 850,
            y: 498,
            color: 0x212121,
            width: 44,
            height: 96,
            angle: 0,
            alpha: 0,
        });

        keyEnterRect.on('mouseup', async () => {
            console.log(`pressed enter`);

            keypressAudio.pause();
            keypressAudio.currentTime = 0;
            await keypressAudio.play();

            if (this.text === '42') {
                await successAudio.play();
                this.textService.showText('You found a transponder. For what?');
                this.inventoryService.addItemToInventory({
                    name: InventoryItemEnum.Transponder,
                    imageName: 'transponder.png',
                });
            } else {
                await failureAudio.play();
                this.textService.showText('Nothing happens.');
            }

        });

        this.sceneService.pixiApp?.stage.addChild(keyEnterRect);

        const keyBackspaceRect = createRectangle({
            x: 823,
            y: 440,
            color: 0x212121,
            width: 75,
            height: 50,
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
            this.sceneService.currentScene.set(Scene.DeskDsSascha);
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
