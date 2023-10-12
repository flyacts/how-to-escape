/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, Signal, signal } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-desk-ds-sascha',
    templateUrl: './desk-ds-sascha.component.html',
    styleUrls: ['./desk-ds-sascha.component.scss'],
})
export class DeskDsSaschaComponent {

    public iconSrc: Signal<string>;

    public constructor(
        private sceneService: SceneService,
    ) {
        this.iconSrc = signal('../../../assets/images/desk_ds_1.png');
    }

    public ngOnInit(): void {
        const toDeskDevToni = this.createDeskDevToniArrow();

        this.sceneService.pixiApp?.stage.addChild(toDeskDevToni);
    }

    /**
     * create arrow to Desk Dev Toni
     */
    public createDeskDevToniArrow(): Arrow {
        const toDeskToni = createArrow({
            tipX: 1550,
            tipY: 950,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 0,
        });

        toDeskToni.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevToni);
        };

        return toDeskToni;
    }
}
