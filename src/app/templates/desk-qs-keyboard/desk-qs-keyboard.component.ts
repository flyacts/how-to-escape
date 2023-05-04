import { Component, Input, Signal, computed } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { Arrow, createArrow } from '../../helpers';

@Component({
    selector: 'app-desk-qs-keyboard',
    templateUrl: './desk-qs-keyboard.component.html',
    styleUrls: ['./desk-qs-keyboard.component.scss']
})
export class DeskQsKeyboardComponent {

    public iconSrc: Signal<string>;

    public constructor(
        private sceneService: SceneService,
    ) {
        this.iconSrc = computed(() => !this.sceneService.isQsDeskLightOn()
            ? '../../../assets/images/desk_qs_keyboard_1.png'
            : '../../../assets/images/desk_qs_keyboard_2.png'
        );

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
            this.sceneService.currentScene.set('deskQs');
        };

        return deskQs;
    }
}
