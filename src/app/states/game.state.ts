/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable } from '@angular/core';
import { Selector, State, StateContext } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';

import { GlobalStateInterface } from './globalstate.interface';

export interface GameStateModel {
    currentScene: keyof GlobalStateInterface;
}

@State<GameStateModel>({
    name: 'game',
    defaults: {
        currentScene: 'game',
    },
})
@Injectable({
    providedIn: 'root',
})
export class GameState {

    @Receiver()
    public static goToScene(
        state: StateContext<GameStateModel>,
        action: EmitterAction<keyof GlobalStateInterface>,
    ): void {
        state.patchState({
            currentScene: action.payload,
        });
    }

    @Selector()
    public static currentScene(
        state: GameStateModel,
    ): keyof GlobalStateInterface {
        return state.currentScene;
    }
}
