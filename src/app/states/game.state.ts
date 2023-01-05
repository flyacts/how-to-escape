/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable } from '@angular/core';
import { State, StateContext } from '@ngxs/store';
import { Receiver } from '@ngxs-labs/emitter';

export interface GameStateModel {
    clickedOnGo: boolean;
}

@State<GameStateModel>({
    name: 'game',
    defaults: {
        clickedOnGo: false,
    },
})
@Injectable({
    providedIn: 'root',
})
export class GameState {

    @Receiver()
    public static startGame(
        state: StateContext<GameStateModel>,
    ): void {
        state.patchState({
            clickedOnGo: true,
        });
    }
}
