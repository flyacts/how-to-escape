/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GlobalState } from './states/globalstate.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public title = 'escape-game';

    public clickedOnGo$!: Observable<boolean>;

    public constructor(
        public store: Store,
    ) { }

    public ngOnInit(): void {
        this.clickedOnGo$ = this.store.select((state: GlobalState) => state.game.clickedOnGo);
    }
}
