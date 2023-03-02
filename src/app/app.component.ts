/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { createPixiApp } from './helpers';
import { SceneService } from './services/scene.service';
import { GameState } from './states/game.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    @ViewChild('canvas', { static: true })
    public canvas!: ElementRef<HTMLCanvasElement>;

    public title = 'escape-game';

    public currentScene$!: Observable<string>;

    public constructor(
        public store: Store,
        public sceneService: SceneService,
    ) { }

    public ngOnInit(): void {
        this.currentScene$ = this.store.select(GameState.currentScene);
        this.sceneService.pixiApp = createPixiApp(this.canvas);

    }
}
