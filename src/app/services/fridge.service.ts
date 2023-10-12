/*!
 * @copyright FLYACTS GmbH 2023
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { FridgeState } from '../enum';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root',
})
export class FridgeService {

    public state: WritableSignal<FridgeState>;

    public constructor(
        private localStorageService: LocalStorageService,
    ) {
        this.state = signal(
            this.localStorageService.get('FRIDGE_STATE') ?? FridgeState.ClosedAndUnlocked,
        );

        effect(() => {
            if (this.state()) {
                this.localStorageService.set('FRIDGE_STATE', this.state());
            }
        });
    }
}
