/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable } from '@angular/core';
import { State, StateContext } from '@ngxs/store';
import { Receiver } from '@ngxs-labs/emitter';

export interface PcQsStateModel {

}

@State<PcQsStateModel>({
    name: 'pcQs',
    defaults: {
        
    },
})
@Injectable({
    providedIn: 'root',
})
export class PcQsState {

    @Receiver()
    public static leavePc(
        state: StateContext<PcQsStateModel>,
    ): void {
        state.patchState({
            isInsideScene: false,
        });
    }
}
