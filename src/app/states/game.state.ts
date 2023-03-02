/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable, Injector } from '@angular/core';
import { Selector, State, StateContext } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';

import { SceneService } from '../services/scene.service';
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
    private static sceneService: SceneService;

    public constructor(
        injector: Injector,
    ) {
        GameState.sceneService = injector.get<SceneService>(SceneService);
    }

    @Receiver()
    public static goToScene(
        state: StateContext<GameStateModel>,
        action: EmitterAction<keyof GlobalStateInterface>,
    ): void {
        this.sceneService.clear();

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
