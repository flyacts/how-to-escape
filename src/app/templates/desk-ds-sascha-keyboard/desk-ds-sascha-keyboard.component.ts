/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, computed, Signal, signal } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import { TextService } from '../../services/text.service';

@Component({
    selector: 'app-desk-ds-sascha-keyboard',
    templateUrl: './desk-ds-sascha-keyboard.component.html',
    styleUrls: ['./desk-ds-sascha-keyboard.component.scss'],
})
export class DeskQsKeyboardComponent {
    public iconSrc: Signal<string>;

    public text = '';

    public constructor(
        private sceneService: SceneService,
        private textService: TextService,
    ) {
        this.iconSrc = computed(() => '../../../assets/images/desk_ds_keyboard.png');

        const arrow = this.createDeskQsArrow();

        this.sceneService.pixiApp?.stage.addChild(arrow);
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
            this.sceneService.currentScene.set(Scene.DeskDsSaschaKeyboard);
        };

        return deskQs;
    }
}
