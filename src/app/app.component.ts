/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameState } from './states/game.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public title = 'escape-game';

    public currentScene$!: Observable<string>;

    public constructor(
        public store: Store,
    ) { }

    public ngOnInit(): void {
        this.currentScene$ = this.store.select(GameState.currentScene);
    }
}
