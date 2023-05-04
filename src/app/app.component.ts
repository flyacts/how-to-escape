/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, ElementRef, OnInit, ViewChild, WritableSignal  } from '@angular/core';

import { createPixiApp } from './helpers';
import { SceneService } from './services/scene.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    @ViewChild('canvas', { static: true })
    public canvas!: ElementRef<HTMLCanvasElement>;

    public title = 'escape-game';

    public currentScene!: WritableSignal<string>;

    public constructor(
        public sceneService: SceneService,
    ) { }

    public ngOnInit(): void {
        this.currentScene = this.sceneService.currentScene;
        this.sceneService.pixiApp = createPixiApp(this.canvas);
    }
}
