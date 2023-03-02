/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable } from '@angular/core';
import { State, StateContext } from '@ngxs/store';
import { Receiver } from '@ngxs-labs/emitter';

export interface FloorAcStateModel {

}

@State<FloorAcStateModel>({
    name: 'floorAc',
    defaults: {
        
    },
})
@Injectable({
    providedIn: 'root',
})
export class FloorAcState {

    @Receiver()
    public static goToQSDesk(
        state: StateContext<FloorAcStateModel>,
    ): void {
        state.patchState({
            isInsideScene: false,
        });
    }
}
