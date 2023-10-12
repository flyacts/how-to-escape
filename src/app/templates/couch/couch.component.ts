/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, OnInit } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-couch',
    templateUrl: './couch.component.html',
    styleUrls: ['./couch.component.scss'],
})
export class CouchComponent implements OnInit{

    public constructor(
        private sceneService: SceneService,
    ) { }

    public ngOnInit(): void {
        const goToDoor = this.createDoorArrow();

        this.sceneService.pixiApp?.stage.addChild(goToDoor);
    }

    /**
     * create arrow to floorQs
     */
    public createDoorArrow(): Arrow {
        const leaveCouch = createArrow({
            tipX: 1600,
            tipY: 100,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 35,
        });

        leaveCouch.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.Door);
        };

        return leaveCouch;
    }

}
