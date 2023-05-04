/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-desk-dev-3',
    templateUrl: './desk-dev-3.component.html',
    styleUrls: ['./desk-dev-3.component.scss'],
})
export class DeskDev3Component implements OnInit {

    public constructor(
        private sceneService: SceneService,
    ) {  }

    public ngOnInit(): void {
        const leaveDeskToQs = this.createFloorQsArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskToQs);

        const leaveDeskToAc = this.createFloorAcArrow();

        this.sceneService.pixiApp?.stage.addChild(leaveDeskToAc);
    }

    /**
     * create arrow to floorQs
     */
    public createFloorQsArrow(): Arrow {
        const leaveDesk = createArrow({
            tipX: 1500,
            tipY: 950,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.FloorQs);
        };

        return leaveDesk;
    }


    /**
     * create arrow to floorQs
     */
    public createFloorAcArrow(): Arrow {
        const leaveDesk = createArrow({
            tipX: 100,
            tipY: 950,
            color: 0x212121,
            direction: 'left',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.FloorAc);
        };

        return leaveDesk;
    }


}
