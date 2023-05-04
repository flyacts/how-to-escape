/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';

import { createArrow } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-desk-qs',
    templateUrl: './desk-qs.component.html',
    styleUrls: ['./desk-qs.component.scss'],
})
export class DeskQsComponent implements OnInit {

    public constructor(
        private sceneService: SceneService,
    ) { }

    public ngOnInit(): void {
        const leaveDesk = createArrow({
            tipX: 100,
            tipY: 850,
            color: 0x212121,
            direction: 'left',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.leaveDesk();
        };

        this.sceneService.pixiApp?.stage.addChild(leaveDesk);
    }

    public leaveDesk(): void {
        this.sceneService.currentScene.set('floorQs');
    }
}
