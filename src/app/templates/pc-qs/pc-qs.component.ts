/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, ElementRef, ViewChild } from '@angular/core';

import { Scene } from '../../enum';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-pc-qs',
    templateUrl: './pc-qs.component.html',
    styleUrls: ['./pc-qs.component.scss'],
})
export class PcQsComponent {

    @ViewChild('canvas', { static: true })
    public canvas!: ElementRef<HTMLCanvasElement>;

    public constructor(
        private sceneService: SceneService,
    ) { }

    public setup(): void {
        // do stuff here.
    }

    public leavePc(): void {
        this.sceneService.currentScene.set(Scene.DeskQS);
    }
}
