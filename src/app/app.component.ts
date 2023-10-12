/*!
 * @copyright FLYACTS GmbH 2023
 */

import { trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild, WritableSignal  } from '@angular/core';

import { fadeInAnimation, introAnimation } from './animations';
import { Scene } from './enum';
import { createPixiApp } from './helpers';
import { SceneService } from './services/scene.service';
import { TextService } from './services/text.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('fadeIn', [fadeInAnimation]),
        trigger('intro', [introAnimation]),
    ],
})
export class AppComponent implements OnInit {

    @ViewChild('canvas', { static: true })
    public canvas!: ElementRef<HTMLCanvasElement>;

    public title = 'escape-game';
    public scene = Scene;

    public currentScene!: WritableSignal<Scene>;

    public constructor(
        public sceneService: SceneService,
        public textService: TextService,
    ) { }

    public ngOnInit(): void {
        this.currentScene = this.sceneService.currentScene;
        this.sceneService.pixiApp = createPixiApp(this.canvas);
    }
}
