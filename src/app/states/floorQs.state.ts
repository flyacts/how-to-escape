/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable } from '@angular/core';
import { State, StateContext } from '@ngxs/store';
import { Receiver } from '@ngxs-labs/emitter';

export interface FloorQsStateModel {

}

@State<FloorQsStateModel>({
    name: 'floorQs',
    defaults: {
        
    },
})
@Injectable({
    providedIn: 'root',
})
export class FloorQsState {

    @Receiver()
    public static goToQSDesk(
        state: StateContext<FloorQsStateModel>,
    ): void {
        state.patchState({
            isInsideScene: false,
        });
    }
}
