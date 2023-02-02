/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable } from '@angular/core';
import { State, StateContext } from '@ngxs/store';
import { Receiver } from '@ngxs-labs/emitter';

export interface DeskQsStateModel {

}

@State<DeskQsStateModel>({
    name: 'deskQs',
    defaults: {

    },
})
@Injectable({
    providedIn: 'root',
})
export class DeskQsState {

    @Receiver()
    public static leavePc(
        state: StateContext<DeskQsStateModel>,
    ): void {
        state.patchState({
            isInsideScene: false,
        });
    }
}
